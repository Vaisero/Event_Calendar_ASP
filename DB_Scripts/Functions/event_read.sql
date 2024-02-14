

CREATE OR REPLACE FUNCTION public.event_read(
	p_date date)
    RETURNS TABLE(event_name text, event_date date, category_name text, event_id integer) 
    LANGUAGE 'plpgsql'

AS $$
BEGIN
RETURN QUERY
SELECT e.event_name, e.event_date, c.category_name, e.event_id
FROM public.event e
INNER JOIN public.category c ON e.category_id = c.category_id
WHERE e.event_date = p_date;
END
$$;
