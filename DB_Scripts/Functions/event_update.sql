

CREATE OR REPLACE FUNCTION public.event_update(
	p_id integer,
	p_name text,
	p_date date,
	p_category integer)
    RETURNS TABLE(year integer, month integer, day integer) 
    LANGUAGE 'plpgsql'

AS $$
BEGIN
RETURN QUERY
UPDATE
public.event 
SET event_name = p_name, event_date = p_date, category_id = p_category
WHERE event_id = p_id
RETURNING 
	extract('month' from event_date)::int,
	extract('year' from event_date)::int,
	extract('day' from event_date)::int;
END;
$$;
