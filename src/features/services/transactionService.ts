import { supabase } from "../../app/supabase";

export const fetchTransactions = async () => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id);

  if (error) throw error;
  return data;
};
