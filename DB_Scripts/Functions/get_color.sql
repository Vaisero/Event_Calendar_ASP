

CREATE OR REPLACE FUNCTION public.get_color(
	p_month integer,
	p_year integer)
    RETURNS TABLE(day integer, color text) 
    LANGUAGE 'plpgsql'

AS $$
begin
	return query 
	select extract ('day' from e.event_date)::int, c.category_color from event as e
	inner join category as c on e.category_id = c.category_id
	where extract('month' from event_date) = p_month 
	and extract('year' from event_date) = p_year;
end;
$$;
