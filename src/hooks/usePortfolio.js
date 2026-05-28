import { useEffect, useState } from 'react';
import { supabase, supabaseEnabled } from '../lib/supabase';
import * as fallback from '../lib/portfolioData';

function useTable(table, fallbackData, order = { column: 'display_order', ascending: true }) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(supabaseEnabled);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!supabaseEnabled) return;
    let alive = true;
    (async () => {
      try {
        const { data: rows, error } = await supabase
          .from(table)
          .select('*')
          .order(order.column, { ascending: order.ascending });
        if (!alive) return;
        if (error) throw error;
        if (rows && rows.length) setData(rows);
      } catch (e) {
        if (alive) setError(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [table]);

  return { data, loading, error };
}

export const useProjects    = () => useTable('projects',    fallback.projects);
export const useSkills      = () => useTable('skills',      fallback.skills);
export const useExperiences = () => useTable('experiences', fallback.experiences, { column: 'start_date', ascending: false });
export const useServices    = () => useTable('services',    fallback.services);

export async function submitContact(payload) {
  if (!supabaseEnabled) {
    await new Promise((r) => setTimeout(r, 700));
    return { ok: true, simulated: true };
  }
  const { error } = await supabase.from('contact_messages').insert([payload]);
  if (error) return { ok: false, error };
  return { ok: true };
}

export const profile = fallback.profile;
export const education = fallback.education;
export const bubbles = fallback.bubbles;
