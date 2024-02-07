--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

-- Started on 2023-12-07 11:39:15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 17779)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 17780)
-- Name: assessment_experience_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assessment_experience_data (
    id_assessment bigint NOT NULL,
    description_assessment character varying(255) NOT NULL,
    score_assessment numeric(38,2),
    title_assessment character varying(255) NOT NULL,
    user_id bigint NOT NULL,
    experience_id bigint
);


ALTER TABLE public.assessment_experience_data OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 17855)
-- Name: assessment_generator; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.assessment_generator
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.assessment_generator OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 17787)
-- Name: assessment_hosting_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assessment_hosting_data (
    id_assessment bigint NOT NULL,
    description_assessment character varying(255) NOT NULL,
    score_assessment numeric(38,2),
    title_assessment character varying(255) NOT NULL,
    user_id bigint NOT NULL,
    hosting_id bigint
);


ALTER TABLE public.assessment_hosting_data OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 17795)
-- Name: cupons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cupons (
    cupom_id bigint NOT NULL,
    categoria integer NOT NULL,
    cod_do_cupom character varying(255) NOT NULL,
    data_expiracao date NOT NULL,
    desconto double precision NOT NULL,
    disponivel boolean NOT NULL,
    hosting_id bigint,
    titulo character varying(255) NOT NULL,
    user_id bigint NOT NULL,
    purchase_id bigint
);


ALTER TABLE public.cupons OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 17794)
-- Name: cupons_cupom_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cupons_cupom_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cupons_cupom_id_seq OWNER TO postgres;

--
-- TOC entry 3423 (class 0 OID 0)
-- Dependencies: 216
-- Name: cupons_cupom_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cupons_cupom_id_seq OWNED BY public.cupons.cupom_id;


--
-- TOC entry 218 (class 1259 OID 17803)
-- Name: experience; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.experience (
    experience_id bigint NOT NULL,
    time_end character varying(255) NOT NULL,
    time_start character varying(255) NOT NULL,
    address_number integer,
    cep character varying(255),
    city character varying(255),
    country_state character varying(255),
    neighborhood character varying(255),
    street character varying(255),
    date date NOT NULL,
    "timestamp" date,
    description character varying(255),
    price double precision NOT NULL,
    title character varying(255),
    user_id bigint NOT NULL
);


ALTER TABLE public.experience OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 17856)
-- Name: experience_generator; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.experience_generator
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.experience_generator OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 17810)
-- Name: hosting; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hosting (
    hosting_id bigint NOT NULL,
    address_number integer,
    cep character varying(255),
    city character varying(255),
    country_state character varying(255),
    neighborhood character varying(255),
    street character varying(255),
    bathrooms_quantity integer NOT NULL,
    check_in character varying(255) NOT NULL,
    check_out character varying(255) NOT NULL,
    "timestamp" date,
    description character varying(255),
    hosting_area double precision NOT NULL,
    max_capacity integer NOT NULL,
    rent_price double precision NOT NULL,
    rooms_quantity integer NOT NULL,
    title character varying(255),
    user_id bigint NOT NULL
);


ALTER TABLE public.hosting OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 17857)
-- Name: hosting_generator; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hosting_generator
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hosting_generator OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 17817)
-- Name: image_experience; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.image_experience (
    image_id bigint NOT NULL,
    url character varying(255),
    experience_id bigint
);


ALTER TABLE public.image_experience OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 17858)
-- Name: image_generator; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.image_generator
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.image_generator OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 17822)
-- Name: image_hosting; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.image_hosting (
    image_id bigint NOT NULL,
    url character varying(255),
    hosting_id bigint
);


ALTER TABLE public.image_hosting OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 17827)
-- Name: purchase; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.purchase (
    purchase_id bigint NOT NULL,
    "timestamp" date,
    price double precision NOT NULL,
    buyer_id bigint NOT NULL
);


ALTER TABLE public.purchase OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 17833)
-- Name: purchase_experience; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.purchase_experience (
    id bigint NOT NULL,
    buyer_user_id bigint NOT NULL,
    date date,
    seller_user_id bigint NOT NULL,
    experience_id bigint,
    purchase_id bigint
);


ALTER TABLE public.purchase_experience OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 17832)
-- Name: purchase_experience_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.purchase_experience_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.purchase_experience_id_seq OWNER TO postgres;

--
-- TOC entry 3424 (class 0 OID 0)
-- Dependencies: 223
-- Name: purchase_experience_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.purchase_experience_id_seq OWNED BY public.purchase_experience.id;


--
-- TOC entry 226 (class 1259 OID 17840)
-- Name: purchase_hosting; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.purchase_hosting (
    id bigint NOT NULL,
    buyer_user_id bigint NOT NULL,
    createad_at timestamp(6) without time zone,
    date_end date NOT NULL,
    date_start date NOT NULL,
    seller_user_id bigint NOT NULL,
    hosting_id bigint,
    purchase_id bigint
);


ALTER TABLE public.purchase_hosting OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 17839)
-- Name: purchase_hosting_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.purchase_hosting_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.purchase_hosting_id_seq OWNER TO postgres;

--
-- TOC entry 3425 (class 0 OID 0)
-- Dependencies: 225
-- Name: purchase_hosting_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.purchase_hosting_id_seq OWNED BY public.purchase_hosting.id;


--
-- TOC entry 228 (class 1259 OID 17847)
-- Name: user_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_data (
    dtype character varying(31) NOT NULL,
    id bigint NOT NULL,
    active boolean NOT NULL,
    address_number integer,
    cep character varying(255),
    city character varying(255),
    country_state character varying(255),
    neighborhood character varying(255),
    street character varying(255),
    birth_date date NOT NULL,
    "timestamp" date,
    email character varying(255),
    name character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone character varying(255),
    social_id character varying(255),
    client_code character varying(255)
);


ALTER TABLE public.user_data OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 17846)
-- Name: user_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_data_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_data_id_seq OWNER TO postgres;

--
-- TOC entry 3426 (class 0 OID 0)
-- Dependencies: 227
-- Name: user_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_data_id_seq OWNED BY public.user_data.id;


--
-- TOC entry 3220 (class 2604 OID 17798)
-- Name: cupons cupom_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cupons ALTER COLUMN cupom_id SET DEFAULT nextval('public.cupons_cupom_id_seq'::regclass);


--
-- TOC entry 3221 (class 2604 OID 17836)
-- Name: purchase_experience id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase_experience ALTER COLUMN id SET DEFAULT nextval('public.purchase_experience_id_seq'::regclass);


--
-- TOC entry 3222 (class 2604 OID 17843)
-- Name: purchase_hosting id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase_hosting ALTER COLUMN id SET DEFAULT nextval('public.purchase_hosting_id_seq'::regclass);


--
-- TOC entry 3223 (class 2604 OID 17850)
-- Name: user_data id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_data ALTER COLUMN id SET DEFAULT nextval('public.user_data_id_seq'::regclass);


--
-- TOC entry 3398 (class 0 OID 17780)
-- Dependencies: 214
-- Data for Name: assessment_experience_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.assessment_experience_data (id_assessment, description_assessment, score_assessment, title_assessment, user_id, experience_id) FROM stdin;
\.


--
-- TOC entry 3399 (class 0 OID 17787)
-- Dependencies: 215
-- Data for Name: assessment_hosting_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.assessment_hosting_data (id_assessment, description_assessment, score_assessment, title_assessment, user_id, hosting_id) FROM stdin;
\.


--
-- TOC entry 3401 (class 0 OID 17795)
-- Dependencies: 217
-- Data for Name: cupons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cupons (cupom_id, categoria, cod_do_cupom, data_expiracao, desconto, disponivel, hosting_id, titulo, user_id, purchase_id) FROM stdin;
\.


--
-- TOC entry 3402 (class 0 OID 17803)
-- Dependencies: 218
-- Data for Name: experience; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.experience (experience_id, time_end, time_start, address_number, cep, city, country_state, neighborhood, street, date, "timestamp", description, price, title, user_id) FROM stdin;
\.


--
-- TOC entry 3403 (class 0 OID 17810)
-- Dependencies: 219
-- Data for Name: hosting; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hosting (hosting_id, address_number, cep, city, country_state, neighborhood, street, bathrooms_quantity, check_in, check_out, "timestamp", description, hosting_area, max_capacity, rent_price, rooms_quantity, title, user_id) FROM stdin;
\.


--
-- TOC entry 3404 (class 0 OID 17817)
-- Dependencies: 220
-- Data for Name: image_experience; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.image_experience (image_id, url, experience_id) FROM stdin;
\.


--
-- TOC entry 3405 (class 0 OID 17822)
-- Dependencies: 221
-- Data for Name: image_hosting; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.image_hosting (image_id, url, hosting_id) FROM stdin;
\.


--
-- TOC entry 3406 (class 0 OID 17827)
-- Dependencies: 222
-- Data for Name: purchase; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.purchase (purchase_id, "timestamp", price, buyer_id) FROM stdin;
\.


--
-- TOC entry 3408 (class 0 OID 17833)
-- Dependencies: 224
-- Data for Name: purchase_experience; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.purchase_experience (id, buyer_user_id, date, seller_user_id, experience_id, purchase_id) FROM stdin;
\.


--
-- TOC entry 3410 (class 0 OID 17840)
-- Dependencies: 226
-- Data for Name: purchase_hosting; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.purchase_hosting (id, buyer_user_id, createad_at, date_end, date_start, seller_user_id, hosting_id, purchase_id) FROM stdin;
\.


--
-- TOC entry 3412 (class 0 OID 17847)
-- Dependencies: 228
-- Data for Name: user_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_data (dtype, id, active, address_number, cep, city, country_state, neighborhood, street, birth_date, "timestamp", email, name, password, phone, social_id, client_code) FROM stdin;
UserData	2	t	23	32400000	Belo Hotizonte	Minas Gerais	Centro	Rua Principal	2001-05-21	2023-03-06	pedro.teste@delete.com	Pedro Marques	12345	31994588745	45011934098	\N
UserData	1	t	23	32400000	Belo Hotizonte	Minas Gerais	Centro	Rua Principal	1998-04-21	2023-12-06	lara.teste@delete.com	Lara Lima Dev	123456789	31990541589	12886132020	\N
UserData	3	t	23	32400000	Belo Hotizonte	Minas Gerais	Centro	Rua Principal	2001-05-21	2023-08-07	victhor.teste@delete.com	Victhor Ribeiro	1234567	31992042792	12883265640	\N
\.


--
-- TOC entry 3427 (class 0 OID 0)
-- Dependencies: 229
-- Name: assessment_generator; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.assessment_generator', 1, false);


--
-- TOC entry 3428 (class 0 OID 0)
-- Dependencies: 216
-- Name: cupons_cupom_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cupons_cupom_id_seq', 1, false);


--
-- TOC entry 3429 (class 0 OID 0)
-- Dependencies: 230
-- Name: experience_generator; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.experience_generator', 1, false);


--
-- TOC entry 3430 (class 0 OID 0)
-- Dependencies: 231
-- Name: hosting_generator; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hosting_generator', 51, true);


--
-- TOC entry 3431 (class 0 OID 0)
-- Dependencies: 232
-- Name: image_generator; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.image_generator', 51, true);


--
-- TOC entry 3432 (class 0 OID 0)
-- Dependencies: 223
-- Name: purchase_experience_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.purchase_experience_id_seq', 1, false);


--
-- TOC entry 3433 (class 0 OID 0)
-- Dependencies: 225
-- Name: purchase_hosting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.purchase_hosting_id_seq', 1, false);


--
-- TOC entry 3434 (class 0 OID 0)
-- Dependencies: 227
-- Name: user_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_data_id_seq', 3, true);


--
-- TOC entry 3225 (class 2606 OID 17786)
-- Name: assessment_experience_data assessment_experience_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_experience_data
    ADD CONSTRAINT assessment_experience_data_pkey PRIMARY KEY (id_assessment);


--
-- TOC entry 3227 (class 2606 OID 17793)
-- Name: assessment_hosting_data assessment_hosting_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_hosting_data
    ADD CONSTRAINT assessment_hosting_data_pkey PRIMARY KEY (id_assessment);


--
-- TOC entry 3229 (class 2606 OID 17802)
-- Name: cupons cupons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cupons
    ADD CONSTRAINT cupons_pkey PRIMARY KEY (cupom_id);


--
-- TOC entry 3231 (class 2606 OID 17809)
-- Name: experience experience_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experience
    ADD CONSTRAINT experience_pkey PRIMARY KEY (experience_id);


--
-- TOC entry 3233 (class 2606 OID 17816)
-- Name: hosting hosting_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hosting
    ADD CONSTRAINT hosting_pkey PRIMARY KEY (hosting_id);


--
-- TOC entry 3235 (class 2606 OID 17821)
-- Name: image_experience image_experience_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image_experience
    ADD CONSTRAINT image_experience_pkey PRIMARY KEY (image_id);


--
-- TOC entry 3237 (class 2606 OID 17826)
-- Name: image_hosting image_hosting_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image_hosting
    ADD CONSTRAINT image_hosting_pkey PRIMARY KEY (image_id);


--
-- TOC entry 3241 (class 2606 OID 17838)
-- Name: purchase_experience purchase_experience_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase_experience
    ADD CONSTRAINT purchase_experience_pkey PRIMARY KEY (id);


--
-- TOC entry 3243 (class 2606 OID 17845)
-- Name: purchase_hosting purchase_hosting_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase_hosting
    ADD CONSTRAINT purchase_hosting_pkey PRIMARY KEY (id);


--
-- TOC entry 3239 (class 2606 OID 17831)
-- Name: purchase purchase_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase
    ADD CONSTRAINT purchase_pkey PRIMARY KEY (purchase_id);


--
-- TOC entry 3245 (class 2606 OID 17854)
-- Name: user_data user_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_data
    ADD CONSTRAINT user_data_pkey PRIMARY KEY (id);


--
-- TOC entry 3246 (class 2606 OID 17859)
-- Name: assessment_experience_data fk2pb12cx3ro47xjdl0a216uu4j; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_experience_data
    ADD CONSTRAINT fk2pb12cx3ro47xjdl0a216uu4j FOREIGN KEY (experience_id) REFERENCES public.experience(experience_id);


--
-- TOC entry 3247 (class 2606 OID 17864)
-- Name: assessment_hosting_data fk48yu6anyj6gy94ordwm07h9d7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_hosting_data
    ADD CONSTRAINT fk48yu6anyj6gy94ordwm07h9d7 FOREIGN KEY (hosting_id) REFERENCES public.hosting(hosting_id);


--
-- TOC entry 3248 (class 2606 OID 17869)
-- Name: cupons fk6jdbdq0qa639amiwr3iesqo97; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cupons
    ADD CONSTRAINT fk6jdbdq0qa639amiwr3iesqo97 FOREIGN KEY (purchase_id) REFERENCES public.purchase(purchase_id);


--
-- TOC entry 3254 (class 2606 OID 17899)
-- Name: purchase_hosting fk70iufpyp95a5hejy7qqss1nh7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase_hosting
    ADD CONSTRAINT fk70iufpyp95a5hejy7qqss1nh7 FOREIGN KEY (hosting_id) REFERENCES public.hosting(hosting_id);


--
-- TOC entry 3251 (class 2606 OID 17884)
-- Name: purchase fkc54eyae6kh61e5nbvgsgxfitc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase
    ADD CONSTRAINT fkc54eyae6kh61e5nbvgsgxfitc FOREIGN KEY (buyer_id) REFERENCES public.user_data(id);


--
-- TOC entry 3255 (class 2606 OID 17904)
-- Name: purchase_hosting fkclsbtyhkdjn67pp4a37uvhbnh; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase_hosting
    ADD CONSTRAINT fkclsbtyhkdjn67pp4a37uvhbnh FOREIGN KEY (purchase_id) REFERENCES public.purchase(purchase_id);


--
-- TOC entry 3252 (class 2606 OID 17894)
-- Name: purchase_experience fkheo0ema9kxenukmw87kt3oy9i; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase_experience
    ADD CONSTRAINT fkheo0ema9kxenukmw87kt3oy9i FOREIGN KEY (purchase_id) REFERENCES public.purchase(purchase_id);


--
-- TOC entry 3253 (class 2606 OID 17889)
-- Name: purchase_experience fki0eout61im25wpix7ifsp25qp; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase_experience
    ADD CONSTRAINT fki0eout61im25wpix7ifsp25qp FOREIGN KEY (experience_id) REFERENCES public.experience(experience_id);


--
-- TOC entry 3250 (class 2606 OID 17879)
-- Name: image_hosting fkkc521aox6hljhfplypcsoc5s8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image_hosting
    ADD CONSTRAINT fkkc521aox6hljhfplypcsoc5s8 FOREIGN KEY (hosting_id) REFERENCES public.hosting(hosting_id);


--
-- TOC entry 3249 (class 2606 OID 17874)
-- Name: image_experience fktfag6uswxyv9hbx4bmklnp064; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image_experience
    ADD CONSTRAINT fktfag6uswxyv9hbx4bmklnp064 FOREIGN KEY (experience_id) REFERENCES public.experience(experience_id);


--
-- TOC entry 3422 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2023-12-07 11:39:15

--
-- PostgreSQL database dump complete
--

