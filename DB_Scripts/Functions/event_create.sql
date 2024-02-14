

CREATE OR REPLACE FUNCTION public.event_create(
	p_name text,
	p_date date,
	p_category integer)
    RETURNS TABLE(year integer, month integer, day integer) 
    LANGUAGE 'plpgsql'

AS $$
BEGIN
RETURN QUERY
INSERT
INTO public.event
(event_name, event_date, category_id)
VALUES (p_name, p_date, p_category)
RETURNING 
	extract('month' from event_date)::int,
	extract('year' from event_date)::int,
	extract('day' from event_date)::int;
END;
$$;
