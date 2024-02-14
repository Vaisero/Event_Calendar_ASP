

CREATE OR REPLACE FUNCTION public.category_names(
	)
    RETURNS TABLE(category_id integer, category_name text) 
    LANGUAGE 'plpgsql'

AS $$
BEGIN
RETURN QUERY
select c.category_id, c.category_name
from public.category c; 
END;
$$;

