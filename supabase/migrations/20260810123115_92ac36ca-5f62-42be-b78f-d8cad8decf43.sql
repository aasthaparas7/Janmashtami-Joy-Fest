CREATE TYPE public.app_role AS ENUM ('admin','user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own roles readable" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE SEQUENCE public.reg_seq START 1001;

CREATE OR REPLACE FUNCTION public.set_registration_id()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.registration_id IS NULL THEN
    NEW.registration_id := TG_ARGV[0] || '-2026-' || nextval('public.reg_seq');
  END IF;
  RETURN NEW;
END;
$$;

CREATE TABLE public.kids_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id text UNIQUE,
  parent_name text NOT NULL,
  mobile text NOT NULL,
  email text NOT NULL,
  child_name text NOT NULL,
  child_age integer NOT NULL,
  category text NOT NULL,
  competitions text[] NOT NULL DEFAULT '{}',
  school_name text,
  city text,
  participants integer NOT NULL DEFAULT 1,
  emergency_contact text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.kids_registrations TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.kids_registrations TO authenticated;
GRANT ALL ON public.kids_registrations TO service_role;
ALTER TABLE public.kids_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can register kids" ON public.kids_registrations FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admins read kids" ON public.kids_registrations FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update kids" ON public.kids_registrations FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins delete kids" ON public.kids_registrations FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER kids_reg_id BEFORE INSERT ON public.kids_registrations FOR EACH ROW EXECUTE FUNCTION public.set_registration_id('KJ');

CREATE TABLE public.dance_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id text UNIQUE,
  team_name text NOT NULL,
  leader_name text NOT NULL,
  mobile text NOT NULL,
  email text NOT NULL,
  participants integer NOT NULL DEFAULT 1,
  age_group text,
  dance_style text,
  song_name text,
  performance_description text,
  team_members text,
  organisation text,
  city text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.dance_registrations TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.dance_registrations TO authenticated;
GRANT ALL ON public.dance_registrations TO service_role;
ALTER TABLE public.dance_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can register team" ON public.dance_registrations FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admins read teams" ON public.dance_registrations FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update teams" ON public.dance_registrations FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins delete teams" ON public.dance_registrations FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER dance_reg_id BEFORE INSERT ON public.dance_registrations FOR EACH ROW EXECUTE FUNCTION public.set_registration_id('GD');