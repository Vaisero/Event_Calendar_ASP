

CREATE OR REPLACE FUNCTION public.event_delete(
	p_id integer)
    RETURNS TABLE(year integer, month integer, day integer) 
    LANGUAGE 'plpgsql'

AS $$
BEGIN
RETURN QUERY
DELETE
FROM public.event 
WHERE event_id = p_id
RETURNING 
	extract('month' from event_date)::int,
	extract('year' from event_date)::int,
	extract('day' from event_date)::int;
END;
$$;

