CREATE OR REPLACE FUNCTION public.submit_kids_registration(payload jsonb)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE new_id text;
BEGIN
  INSERT INTO public.kids_registrations (
    parent_name, mobile, email, child_name, child_age, category, competitions,
    school_name, city, participants, emergency_contact
  ) VALUES (
    left(trim(payload->>'parent_name'), 100),
    left(trim(payload->>'mobile'), 15),
    left(trim(payload->>'email'), 255),
    left(trim(payload->>'child_name'), 100),
    least(greatest((payload->>'child_age')::int, 1), 25),
    payload->>'category',
    COALESCE(ARRAY(SELECT jsonb_array_elements_text(payload->'competitions')), '{}'),
    left(trim(COALESCE(payload->>'school_name','')), 150),
    left(trim(COALESCE(payload->>'city','')), 100),
    least(greatest(COALESCE((payload->>'participants')::int,1), 1), 50),
    left(trim(COALESCE(payload->>'emergency_contact','')), 15)
  )
  RETURNING registration_id INTO new_id;

  IF payload->>'category' NOT IN ('Balgopal','Nandgopal','Nandkishore') THEN
    RAISE EXCEPTION 'Invalid category';
  END IF;

  RETURN new_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.submit_dance_registration(payload jsonb)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE new_id text;
BEGIN
  INSERT INTO public.dance_registrations (
    team_name, leader_name, mobile, email, participants, age_group, dance_style,
    song_name, performance_description, team_members, organisation, city
  ) VALUES (
    left(trim(payload->>'team_name'), 100),
    left(trim(payload->>'leader_name'), 100),
    left(trim(payload->>'mobile'), 15),
    left(trim(payload->>'email'), 255),
    least(greatest(COALESCE((payload->>'participants')::int,2), 1), 60),
    left(trim(COALESCE(payload->>'age_group','')), 50),
    left(trim(COALESCE(payload->>'dance_style','')), 80),
    left(trim(COALESCE(payload->>'song_name','')), 150),
    left(trim(COALESCE(payload->>'performance_description','')), 600),
    left(trim(COALESCE(payload->>'team_members','')), 1000),
    left(trim(COALESCE(payload->>'organisation','')), 150),
    left(trim(COALESCE(payload->>'city','')), 100)
  )
  RETURNING registration_id INTO new_id;
  RETURN new_id;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.submit_kids_registration(jsonb) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.submit_dance_registration(jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_kids_registration(jsonb) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.submit_dance_registration(jsonb) TO anon, authenticated, service_role;