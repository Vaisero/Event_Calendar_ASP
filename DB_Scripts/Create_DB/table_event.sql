

CREATE TABLE IF NOT EXISTS public.event
(
    event_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    event_name text COLLATE pg_catalog."default" NOT NULL,
    event_date date NOT NULL,
    category_id integer NOT NULL,
    CONSTRAINT "Events_pkey" PRIMARY KEY (event_id),
    CONSTRAINT fk FOREIGN KEY (category_id)
        REFERENCES public.category (category_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
