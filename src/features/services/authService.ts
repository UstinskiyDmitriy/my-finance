import { supabase } from "../../app/supabase";


// Регистрация нового пользователя
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  if(data) {
    signIn(email, password)
  }
  return data.user;
};

// Вход пользователя
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data.user;
};

// Выход из аккаунта
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
