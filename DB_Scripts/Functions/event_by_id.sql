

CREATE OR REPLACE FUNCTION public.event_by_id(
	p_id integer)
    RETURNS TABLE(event_name text, event_date date, category_id integer) 
    LANGUAGE 'plpgsql'

AS $$
BEGIN
RETURN QUERY
Select e.event_name, e.event_date, e.category_id
from public.event e
where e.event_id = p_id;
END;
$$;

