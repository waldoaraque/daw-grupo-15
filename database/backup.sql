--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Ubuntu 16.2-1.pgdg22.04+1)
-- Dumped by pg_dump version 16.2 (Ubuntu 16.2-1.pgdg22.04+1)

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
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: contenidos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contenidos (
    id_contenido integer NOT NULL,
    descripcion_contenido text NOT NULL,
    titulo_contenido character varying(255) NOT NULL,
    archivo_contenido bytea,
    curso_id integer,
    usuario_id integer NOT NULL
);


ALTER TABLE public.contenidos OWNER TO postgres;

--
-- Name: contenidos_id_contenido_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contenidos_id_contenido_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contenidos_id_contenido_seq OWNER TO postgres;

--
-- Name: contenidos_id_contenido_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contenidos_id_contenido_seq OWNED BY public.contenidos.id_contenido;


--
-- Name: contenidos_modulo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contenidos_modulo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contenidos_modulo_id_seq OWNER TO postgres;

--
-- Name: contenidos_modulo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contenidos_modulo_id_seq OWNED BY public.contenidos.curso_id;


--
-- Name: contenidos_usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contenidos_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contenidos_usuario_id_seq OWNER TO postgres;

--
-- Name: contenidos_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contenidos_usuario_id_seq OWNED BY public.contenidos.usuario_id;


--
-- Name: cursos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cursos (
    id_curso integer NOT NULL,
    descripcion_curso text,
    nombre_curso character varying(100),
    modulo_id integer NOT NULL
);


ALTER TABLE public.cursos OWNER TO postgres;

--
-- Name: cursos_id_curso_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cursos_id_curso_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cursos_id_curso_seq OWNER TO postgres;

--
-- Name: cursos_id_curso_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cursos_id_curso_seq OWNED BY public.cursos.id_curso;


--
-- Name: cursos_modulo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cursos_modulo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cursos_modulo_id_seq OWNER TO postgres;

--
-- Name: cursos_modulo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cursos_modulo_id_seq OWNED BY public.cursos.modulo_id;


--
-- Name: diccionarioeco; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.diccionarioeco (
    id_palabra integer NOT NULL,
    palabra character varying(100) NOT NULL,
    definicion text NOT NULL,
    categoria character varying(1) NOT NULL,
    usuario_id integer NOT NULL
);


ALTER TABLE public.diccionarioeco OWNER TO postgres;

--
-- Name: diccionarioeco_id_diccionario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.diccionarioeco_id_diccionario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.diccionarioeco_id_diccionario_seq OWNER TO postgres;

--
-- Name: diccionarioeco_id_diccionario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.diccionarioeco_id_diccionario_seq OWNED BY public.diccionarioeco.id_palabra;


--
-- Name: diccionarioeco_usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.diccionarioeco_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.diccionarioeco_usuario_id_seq OWNER TO postgres;

--
-- Name: diccionarioeco_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.diccionarioeco_usuario_id_seq OWNED BY public.diccionarioeco.usuario_id;


--
-- Name: escuelas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.escuelas (
    id_escuela integer NOT NULL,
    nombre_escuela character varying(100) NOT NULL,
    ubicacion character varying(255)
);


ALTER TABLE public.escuelas OWNER TO postgres;

--
-- Name: escuelas_id_escuela_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.escuelas_id_escuela_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.escuelas_id_escuela_seq OWNER TO postgres;

--
-- Name: escuelas_id_escuela_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.escuelas_id_escuela_seq OWNED BY public.escuelas.id_escuela;


--
-- Name: foro; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.foro (
    id_foro integer NOT NULL,
    titulo_foro character varying(100) NOT NULL,
    usuario_id integer,
    descripcion_foro text NOT NULL,
    fechapub_foro timestamp without time zone NOT NULL
);


ALTER TABLE public.foro OWNER TO postgres;

--
-- Name: foro_id_foro_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.foro_id_foro_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.foro_id_foro_seq OWNER TO postgres;

--
-- Name: foro_id_foro_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.foro_id_foro_seq OWNED BY public.foro.id_foro;


--
-- Name: mensajes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mensajes (
    id_mensajes integer NOT NULL,
    contenido_mensaje text NOT NULL,
    tema_id integer NOT NULL,
    usuario_id integer NOT NULL,
    fechapub_mensaje timestamp without time zone NOT NULL
);


ALTER TABLE public.mensajes OWNER TO postgres;

--
-- Name: mensajes_tema_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mensajes_tema_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mensajes_tema_id_seq OWNER TO postgres;

--
-- Name: mensajes_tema_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mensajes_tema_id_seq OWNED BY public.mensajes.tema_id;


--
-- Name: mensajes_usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mensajes_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mensajes_usuario_id_seq OWNER TO postgres;

--
-- Name: mensajes_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mensajes_usuario_id_seq OWNED BY public.mensajes.usuario_id;


--
-- Name: modulos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modulos (
    id_modulo integer NOT NULL,
    descipcion text NOT NULL,
    nombre_modulo character varying(100)
);


ALTER TABLE public.modulos OWNER TO postgres;

--
-- Name: modulos_id_modulo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.modulos_id_modulo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.modulos_id_modulo_seq OWNER TO postgres;

--
-- Name: modulos_id_modulo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.modulos_id_modulo_seq OWNED BY public.modulos.id_modulo;


--
-- Name: puntuaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.puntuaciones (
    id_puntuaciones integer NOT NULL,
    puntuaciontotal double precision NOT NULL,
    usuario_id integer NOT NULL,
    quest_realizados double precision,
    interacciones_tema double precision,
    interacciones_mensaje double precision,
    puntuaciones_foro double precision
);


ALTER TABLE public.puntuaciones OWNER TO postgres;

--
-- Name: puntuaciones_id_puntuaciones_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.puntuaciones_id_puntuaciones_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.puntuaciones_id_puntuaciones_seq OWNER TO postgres;

--
-- Name: puntuaciones_id_puntuaciones_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.puntuaciones_id_puntuaciones_seq OWNED BY public.puntuaciones.id_puntuaciones;


--
-- Name: puntuaciones_usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.puntuaciones_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.puntuaciones_usuario_id_seq OWNER TO postgres;

--
-- Name: puntuaciones_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.puntuaciones_usuario_id_seq OWNED BY public.puntuaciones.usuario_id;


--
-- Name: quests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quests (
    id_quest integer NOT NULL,
    titulo_quest character varying(100) NOT NULL,
    descripcion_quest text NOT NULL,
    modulo_id integer NOT NULL,
    usuario_id integer NOT NULL,
    preguntas text NOT NULL,
    respuestas text NOT NULL,
    archivo_quest bytea
);


ALTER TABLE public.quests OWNER TO postgres;

--
-- Name: quests_id_quest_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quests_id_quest_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quests_id_quest_seq OWNER TO postgres;

--
-- Name: quests_id_quest_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quests_id_quest_seq OWNED BY public.quests.id_quest;


--
-- Name: quests_modulo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quests_modulo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quests_modulo_id_seq OWNER TO postgres;

--
-- Name: quests_modulo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quests_modulo_id_seq OWNED BY public.quests.modulo_id;


--
-- Name: quests_usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quests_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quests_usuario_id_seq OWNER TO postgres;

--
-- Name: quests_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quests_usuario_id_seq OWNED BY public.quests.usuario_id;


--
-- Name: resultados_quest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.resultados_quest (
    id_resultados_quest integer NOT NULL,
    usuario_id integer NOT NULL,
    puntuacion double precision NOT NULL,
    quest_id integer NOT NULL
);


ALTER TABLE public.resultados_quest OWNER TO postgres;

--
-- Name: resultados_quest_id_resultados_quest_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.resultados_quest_id_resultados_quest_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.resultados_quest_id_resultados_quest_seq OWNER TO postgres;

--
-- Name: resultados_quest_id_resultados_quest_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.resultados_quest_id_resultados_quest_seq OWNED BY public.resultados_quest.id_resultados_quest;


--
-- Name: resultados_quest_quest_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.resultados_quest_quest_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.resultados_quest_quest_id_seq OWNER TO postgres;

--
-- Name: resultados_quest_quest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.resultados_quest_quest_id_seq OWNED BY public.resultados_quest.quest_id;


--
-- Name: resultados_quest_usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.resultados_quest_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.resultados_quest_usuario_id_seq OWNER TO postgres;

--
-- Name: resultados_quest_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.resultados_quest_usuario_id_seq OWNED BY public.resultados_quest.usuario_id;


--
-- Name: temas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.temas (
    id_tema integer NOT NULL,
    titulo_tema character varying(100) NOT NULL,
    descripcion_tema text NOT NULL,
    foro_id integer NOT NULL,
    usuario_id integer NOT NULL,
    fechapub_tema timestamp without time zone NOT NULL
);


ALTER TABLE public.temas OWNER TO postgres;

--
-- Name: temas_foro_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.temas_foro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.temas_foro_id_seq OWNER TO postgres;

--
-- Name: temas_foro_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.temas_foro_id_seq OWNED BY public.temas.foro_id;


--
-- Name: temas_id_tema_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.temas_id_tema_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.temas_id_tema_seq OWNER TO postgres;

--
-- Name: temas_id_tema_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.temas_id_tema_seq OWNED BY public.temas.id_tema;


--
-- Name: temas_usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.temas_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.temas_usuario_id_seq OWNER TO postgres;

--
-- Name: temas_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.temas_usuario_id_seq OWNED BY public.temas.usuario_id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    nombre_usuario character varying(100) NOT NULL,
    apellido_usuario character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    contrasena character varying(255) NOT NULL,
    tipo_usuario character varying(50) NOT NULL,
    escuela_id integer NOT NULL,
    foto_usuario bytea
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_escuela_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_escuela_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_escuela_id_seq OWNER TO postgres;

--
-- Name: usuarios_escuela_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_escuela_id_seq OWNED BY public.usuarios.escuela_id;


--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- Name: contenidos id_contenido; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contenidos ALTER COLUMN id_contenido SET DEFAULT nextval('public.contenidos_id_contenido_seq'::regclass);


--
-- Name: contenidos curso_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contenidos ALTER COLUMN curso_id SET DEFAULT nextval('public.contenidos_modulo_id_seq'::regclass);


--
-- Name: contenidos usuario_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contenidos ALTER COLUMN usuario_id SET DEFAULT nextval('public.contenidos_usuario_id_seq'::regclass);


--
-- Name: cursos id_curso; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cursos ALTER COLUMN id_curso SET DEFAULT nextval('public.cursos_id_curso_seq'::regclass);


--
-- Name: cursos modulo_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cursos ALTER COLUMN modulo_id SET DEFAULT nextval('public.cursos_modulo_id_seq'::regclass);


--
-- Name: diccionarioeco id_palabra; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diccionarioeco ALTER COLUMN id_palabra SET DEFAULT nextval('public.diccionarioeco_id_diccionario_seq'::regclass);


--
-- Name: diccionarioeco usuario_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diccionarioeco ALTER COLUMN usuario_id SET DEFAULT nextval('public.diccionarioeco_usuario_id_seq'::regclass);


--
-- Name: escuelas id_escuela; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.escuelas ALTER COLUMN id_escuela SET DEFAULT nextval('public.escuelas_id_escuela_seq'::regclass);


--
-- Name: foro id_foro; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foro ALTER COLUMN id_foro SET DEFAULT nextval('public.foro_id_foro_seq'::regclass);


--
-- Name: mensajes tema_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajes ALTER COLUMN tema_id SET DEFAULT nextval('public.mensajes_tema_id_seq'::regclass);


--
-- Name: mensajes usuario_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajes ALTER COLUMN usuario_id SET DEFAULT nextval('public.mensajes_usuario_id_seq'::regclass);


--
-- Name: modulos id_modulo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modulos ALTER COLUMN id_modulo SET DEFAULT nextval('public.modulos_id_modulo_seq'::regclass);


--
-- Name: puntuaciones id_puntuaciones; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puntuaciones ALTER COLUMN id_puntuaciones SET DEFAULT nextval('public.puntuaciones_id_puntuaciones_seq'::regclass);


--
-- Name: puntuaciones usuario_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puntuaciones ALTER COLUMN usuario_id SET DEFAULT nextval('public.puntuaciones_usuario_id_seq'::regclass);


--
-- Name: quests id_quest; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quests ALTER COLUMN id_quest SET DEFAULT nextval('public.quests_id_quest_seq'::regclass);


--
-- Name: quests modulo_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quests ALTER COLUMN modulo_id SET DEFAULT nextval('public.quests_modulo_id_seq'::regclass);


--
-- Name: quests usuario_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quests ALTER COLUMN usuario_id SET DEFAULT nextval('public.quests_usuario_id_seq'::regclass);


--
-- Name: resultados_quest id_resultados_quest; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resultados_quest ALTER COLUMN id_resultados_quest SET DEFAULT nextval('public.resultados_quest_id_resultados_quest_seq'::regclass);


--
-- Name: resultados_quest usuario_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resultados_quest ALTER COLUMN usuario_id SET DEFAULT nextval('public.resultados_quest_usuario_id_seq'::regclass);


--
-- Name: resultados_quest quest_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resultados_quest ALTER COLUMN quest_id SET DEFAULT nextval('public.resultados_quest_quest_id_seq'::regclass);


--
-- Name: temas id_tema; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temas ALTER COLUMN id_tema SET DEFAULT nextval('public.temas_id_tema_seq'::regclass);


--
-- Name: temas foro_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temas ALTER COLUMN foro_id SET DEFAULT nextval('public.temas_foro_id_seq'::regclass);


--
-- Name: temas usuario_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temas ALTER COLUMN usuario_id SET DEFAULT nextval('public.temas_usuario_id_seq'::regclass);


--
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- Name: usuarios escuela_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN escuela_id SET DEFAULT nextval('public.usuarios_escuela_id_seq'::regclass);


--
-- Data for Name: contenidos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contenidos (id_contenido, descripcion_contenido, titulo_contenido, archivo_contenido, curso_id, usuario_id) FROM stdin;
\.


--
-- Data for Name: cursos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cursos (id_curso, descripcion_curso, nombre_curso, modulo_id) FROM stdin;
\.


--
-- Data for Name: diccionarioeco; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.diccionarioeco (id_palabra, palabra, definicion, categoria, usuario_id) FROM stdin;
1	Reciclaje	Proceso mediante el cual se recolectan, separan, procesan y se utilizan de nuevo materiales que de otro modo se considerarían como desechos. Es una práctica fundamental para la sostenibilidad ambiental y la reducción de la contaminación	R	2
3	recicla	Proceso mediante el cual se recolectan, clasifican y transforman materiales ya utilizados para darles una nueva vida y reducir la generación de residuos.	R	2
4	ambiente	Entorno que afecta y condiciona especialmente las circunstancias de vida de las personas o la sociedad en su conjunto.	A	2
5	ecologico	Relacionado con el estudio y la preservación del medio ambiente, buscando un equilibrio entre las actividades humanas y la naturaleza para garantizar la sostenibilidad de los recursos naturales.	E	2
\.


--
-- Data for Name: escuelas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.escuelas (id_escuela, nombre_escuela, ubicacion) FROM stdin;
1	instituto rafael meirelo	valencia, 46520 sagunto av. 09 de octubre
\.


--
-- Data for Name: foro; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.foro (id_foro, titulo_foro, usuario_id, descripcion_foro, fechapub_foro) FROM stdin;
\.


--
-- Data for Name: mensajes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mensajes (id_mensajes, contenido_mensaje, tema_id, usuario_id, fechapub_mensaje) FROM stdin;
\.


--
-- Data for Name: modulos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.modulos (id_modulo, descipcion, nombre_modulo) FROM stdin;
\.


--
-- Data for Name: puntuaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.puntuaciones (id_puntuaciones, puntuaciontotal, usuario_id, quest_realizados, interacciones_tema, interacciones_mensaje, puntuaciones_foro) FROM stdin;
\.


--
-- Data for Name: quests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quests (id_quest, titulo_quest, descripcion_quest, modulo_id, usuario_id, preguntas, respuestas, archivo_quest) FROM stdin;
\.


--
-- Data for Name: resultados_quest; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.resultados_quest (id_resultados_quest, usuario_id, puntuacion, quest_id) FROM stdin;
\.


--
-- Data for Name: temas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.temas (id_tema, titulo_tema, descripcion_tema, foro_id, usuario_id, fechapub_tema) FROM stdin;
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id_usuario, nombre_usuario, apellido_usuario, email, contrasena, tipo_usuario, escuela_id, foto_usuario) FROM stdin;
2	pedro	alvarado	pedro@midominio.com	$2a$06$I2ibqkRaompOdVH1YyHDMOo9rknt2Y8qi12NbxlcTlQ1QpDE4.WGa	educador	1	\N
3	javier	guevara	jguevara@midominio.com	654321	estudiante	1	\N
4	francisco	ibarra	jguevara@midominio.com	$2a$06$IlTFv2ySVQnj2irAE6uW5e6sDoDTKbo15IvGI0nBadHmjUk235Aj6	estudiante	1	\N
7	gregorio	araque	educador@correo.com	$2b$10$So0xpv7fuHv1fxaqZiYgCOblfvcOVWkj4mM3wQQHWMbrK1g4d1PUq	educador	1	\N
6	kevin	alvarez	estudiante2@correo.com	$2b$10$jc1pcBgE79LuUrDjccduoufiCAotNplFcv123nzaInZiXu.Dn8Oti	estudiante	1	\\x
\.


--
-- Name: contenidos_id_contenido_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contenidos_id_contenido_seq', 1, false);


--
-- Name: contenidos_modulo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contenidos_modulo_id_seq', 1, false);


--
-- Name: contenidos_usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contenidos_usuario_id_seq', 1, false);


--
-- Name: cursos_id_curso_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cursos_id_curso_seq', 1, false);


--
-- Name: cursos_modulo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cursos_modulo_id_seq', 1, false);


--
-- Name: diccionarioeco_id_diccionario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.diccionarioeco_id_diccionario_seq', 5, true);


--
-- Name: diccionarioeco_usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.diccionarioeco_usuario_id_seq', 1, true);


--
-- Name: escuelas_id_escuela_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.escuelas_id_escuela_seq', 1, true);


--
-- Name: foro_id_foro_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.foro_id_foro_seq', 1, false);


--
-- Name: mensajes_tema_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mensajes_tema_id_seq', 1, false);


--
-- Name: mensajes_usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mensajes_usuario_id_seq', 1, false);


--
-- Name: modulos_id_modulo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.modulos_id_modulo_seq', 1, false);


--
-- Name: puntuaciones_id_puntuaciones_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.puntuaciones_id_puntuaciones_seq', 1, false);


--
-- Name: puntuaciones_usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.puntuaciones_usuario_id_seq', 1, false);


--
-- Name: quests_id_quest_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quests_id_quest_seq', 1, false);


--
-- Name: quests_modulo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quests_modulo_id_seq', 1, false);


--
-- Name: quests_usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quests_usuario_id_seq', 1, false);


--
-- Name: resultados_quest_id_resultados_quest_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.resultados_quest_id_resultados_quest_seq', 1, false);


--
-- Name: resultados_quest_quest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.resultados_quest_quest_id_seq', 1, false);


--
-- Name: resultados_quest_usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.resultados_quest_usuario_id_seq', 1, false);


--
-- Name: temas_foro_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.temas_foro_id_seq', 1, false);


--
-- Name: temas_id_tema_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.temas_id_tema_seq', 1, false);


--
-- Name: temas_usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.temas_usuario_id_seq', 1, false);


--
-- Name: usuarios_escuela_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_escuela_id_seq', 1, false);


--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 7, true);


--
-- Name: contenidos pk_contenidos; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contenidos
    ADD CONSTRAINT pk_contenidos PRIMARY KEY (id_contenido);


--
-- Name: cursos pk_cursos; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cursos
    ADD CONSTRAINT pk_cursos PRIMARY KEY (id_curso);


--
-- Name: diccionarioeco pk_diccionarioeco; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diccionarioeco
    ADD CONSTRAINT pk_diccionarioeco PRIMARY KEY (id_palabra);


--
-- Name: escuelas pk_escuelas; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.escuelas
    ADD CONSTRAINT pk_escuelas PRIMARY KEY (id_escuela);


--
-- Name: foro pk_foro; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foro
    ADD CONSTRAINT pk_foro PRIMARY KEY (id_foro);


--
-- Name: mensajes pk_mensajes; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajes
    ADD CONSTRAINT pk_mensajes PRIMARY KEY (id_mensajes);


--
-- Name: modulos pk_modulos; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modulos
    ADD CONSTRAINT pk_modulos PRIMARY KEY (id_modulo);


--
-- Name: puntuaciones pk_puntuaciones; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puntuaciones
    ADD CONSTRAINT pk_puntuaciones PRIMARY KEY (id_puntuaciones);


--
-- Name: quests pk_quests; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quests
    ADD CONSTRAINT pk_quests PRIMARY KEY (id_quest);


--
-- Name: resultados_quest pk_resultados_quest; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resultados_quest
    ADD CONSTRAINT pk_resultados_quest PRIMARY KEY (id_resultados_quest);


--
-- Name: temas pk_temas; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temas
    ADD CONSTRAINT pk_temas PRIMARY KEY (id_tema);


--
-- Name: usuarios pk_usuarios; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT pk_usuarios PRIMARY KEY (id_usuario);


--
-- Name: contenidos fk_contenidos_cursos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contenidos
    ADD CONSTRAINT fk_contenidos_cursos FOREIGN KEY (curso_id) REFERENCES public.cursos(id_curso);


--
-- Name: contenidos fk_contenidos_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contenidos
    ADD CONSTRAINT fk_contenidos_usuarios FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id_usuario);


--
-- Name: cursos fk_cursos_modulos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cursos
    ADD CONSTRAINT fk_cursos_modulos FOREIGN KEY (modulo_id) REFERENCES public.modulos(id_modulo);


--
-- Name: diccionarioeco fk_diccionarioeco_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diccionarioeco
    ADD CONSTRAINT fk_diccionarioeco_usuarios FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id_usuario);


--
-- Name: foro fk_foro_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foro
    ADD CONSTRAINT fk_foro_usuarios FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id_usuario);


--
-- Name: mensajes fk_mensajes_temas; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajes
    ADD CONSTRAINT fk_mensajes_temas FOREIGN KEY (tema_id) REFERENCES public.temas(id_tema);


--
-- Name: mensajes fk_mensajes_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajes
    ADD CONSTRAINT fk_mensajes_usuarios FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id_usuario);


--
-- Name: puntuaciones fk_puntuaciones_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puntuaciones
    ADD CONSTRAINT fk_puntuaciones_usuarios FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id_usuario);


--
-- Name: quests fk_quests_modulos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quests
    ADD CONSTRAINT fk_quests_modulos FOREIGN KEY (modulo_id) REFERENCES public.modulos(id_modulo);


--
-- Name: quests fk_quests_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quests
    ADD CONSTRAINT fk_quests_usuarios FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id_usuario);


--
-- Name: resultados_quest fk_resultados_quest_quests; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resultados_quest
    ADD CONSTRAINT fk_resultados_quest_quests FOREIGN KEY (quest_id) REFERENCES public.quests(id_quest);


--
-- Name: resultados_quest fk_resultados_quest_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resultados_quest
    ADD CONSTRAINT fk_resultados_quest_usuarios FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id_usuario);


--
-- Name: temas fk_temas_foro; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temas
    ADD CONSTRAINT fk_temas_foro FOREIGN KEY (foro_id) REFERENCES public.foro(id_foro);


--
-- Name: temas fk_temas_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temas
    ADD CONSTRAINT fk_temas_usuarios FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id_usuario);


--
-- Name: usuarios fk_usuarios_escuelas; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT fk_usuarios_escuelas FOREIGN KEY (escuela_id) REFERENCES public.escuelas(id_escuela);


--
-- PostgreSQL database dump complete
--

