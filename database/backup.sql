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


--
-- Name: calcular_fecha_publicacion_foro(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.calcular_fecha_publicacion_foro() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.fechapub_foro := CURRENT_TIMESTAMP; -- Establece la fecha de publicación como la fecha y hora actuales
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.calcular_fecha_publicacion_foro() OWNER TO postgres;

--
-- Name: calcular_fecha_publicacion_mensajes(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.calcular_fecha_publicacion_mensajes() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.fechapub_mensaje := CURRENT_TIMESTAMP; -- Establece la fecha de publicación como la fecha y hora actuales
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.calcular_fecha_publicacion_mensajes() OWNER TO postgres;

--
-- Name: calcular_fecha_publicacion_tema(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.calcular_fecha_publicacion_tema() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.fechapub_tema := CURRENT_TIMESTAMP; -- Establece la fecha de publicación como la fecha y hora actuales
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.calcular_fecha_publicacion_tema() OWNER TO postgres;

--
-- Name: calcular_fecha_publicacion_temas(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.calcular_fecha_publicacion_temas() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.fechapub_tema := CURRENT_TIMESTAMP; -- Establece la fecha de publicación como la fecha y hora actuales
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.calcular_fecha_publicacion_temas() OWNER TO postgres;

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
    contenido_mensaje text NOT NULL,
    tema_id integer NOT NULL,
    usuario_id integer NOT NULL,
    fechapub_mensaje timestamp without time zone NOT NULL,
    id_mensajes integer NOT NULL
);


ALTER TABLE public.mensajes OWNER TO postgres;

--
-- Name: mensajes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mensajes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mensajes_id_seq OWNER TO postgres;

--
-- Name: mensajes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mensajes_id_seq OWNED BY public.mensajes.id_mensajes;


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
    puntuaciontotal double precision NOT NULL,
    usuario_id integer NOT NULL,
    quest_realizados double precision,
    interacciones_tema double precision,
    interacciones_mensaje double precision,
    puntuaciones_foro double precision
);


ALTER TABLE public.puntuaciones OWNER TO postgres;

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
-- Name: mensajes id_mensajes; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajes ALTER COLUMN id_mensajes SET DEFAULT nextval('public.mensajes_id_seq'::regclass);


--
-- Name: modulos id_modulo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modulos ALTER COLUMN id_modulo SET DEFAULT nextval('public.modulos_id_modulo_seq'::regclass);


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
9	reciclaje	Proceso mediante el cual se someten materiales ya utilizados a un tratamiento para que puedan ser reutilizados en la fabricación de nuevos productos, contribuyendo así a la conservación de los recursos naturales y a la reducción de la contaminación ambiental.	R	7
10	biodegradable	Se dice de los materiales que pueden descomponerse de forma natural y rápida por microorganismos, siendo menos nocivos para el medio ambiente.	B	7
11	biodiversidad	La biodiversidad es la variedad de seres vivos que habitan en un determinado ecosistema, incluyendo la diversidad genética, de especies y de ecosistemas. Es fundamental para el equilibrio y la estabilidad de los ecosistemas.	B	7
12	ecosistemas	Un ecosistema es una comunidad formada por seres vivos (como plantas, animales y microorganismos) que interactúan entre sí y con su entorno físico (como el suelo, el agua, el aire y la luz solar). Estas interacciones son fundamentales para el equilibrio y la biodiversidad del sistema.	E	7
13	plantas	Organismos autótrofos que realizan la fotosíntesis, obteniendo energía del sol para producir su alimento. Son fundamentales en los ecosistemas terrestres y acuáticos, ya que proporcionan oxígeno, alimentos y refugio para otros seres vivos.	P	7
14	calentamientoglobal	Aumento de la temperatura promedio de la atmósfera terrestre, causado principalmente por la emisión de gases de efecto invernadero debido a actividades humanas como la quema de combustibles fósiles y la deforestación. Este fenómeno conlleva impactos negativos en el clima, los ecosistemas y la vida en general.	C	7
15	fotosintesis	Proceso mediante el cual las plantas, algas y ciertos tipos de bacterias convierten la luz solar en energía química para producir su alimento, liberando oxígeno como subproducto.	F	7
16	algas	Las algas son plantas acuáticas que no tienen raíces, tallos ni hojas verdaderas. También pueden ser unicelulares. Son organismos fotosintéticos que pueden ser de diferentes colores, formas y tamaños. Cumplen un papel fundamental en los ecosistemas acuáticos como productores primarios, ya que generan oxígeno y son la base de la cadena alimenticia en muchos casos.	A	7
17	polinizacion	Proceso mediante el cual el polen es transferido desde los estambres hasta el estigma de una flor, permitiendo la fecundación y la reproducción de las plantas.	P	7
18	contaminacion	Presencia en el ambiente de sustancias dañinas o en concentraciones superiores a las normales, que pueden afectar negativamente la salud de los seres vivos y el equilibrio de los ecosistemas.	C	7
19	recargable	Tipo de producto o dispositivo que puede volver a ser utilizado después de haber agotado su carga o energía, evitando así el uso de pilas desechables y reduciendo la generación de residuos.	R	7
20	cambioclimatico	Alteración del clima que se atribuye directa o indirectamente a la actividad humana y que se suma a la variabilidad natural del clima observada durante períodos comparables.	C	7
21	ecologia	La ecología es la ciencia que estudia las relaciones entre los seres vivos y su entorno, así como la forma en que estos interactúan entre sí y con el medio ambiente.	E	7
22	seresvivos	Organismos que tienen vida, que realizan funciones vitales como crecer, reproducirse y responder a estímulos del entorno.	S	7
23	naturaleza	Entorno que engloba todos los seres vivos, el paisaje, los elementos físicos y químicos que componen la Tierra y su atmósfera.	N	7
24	jungla	Ecosistema denso y exuberante de vegetación, propio de regiones tropicales y subtropicales, caracterizado por una gran diversidad de especies de plantas y animales.	J	7
25	selva	Ecosistema con una gran biodiversidad de especies vegetales y animales, característico de regiones tropicales y subtropicales, con un clima cálido y húmedo.	S	7
26	planeta	Cuerpo celeste que gira alrededor de una estrella y que no emite luz propia. En el caso de la Tierra, es el tercer planeta del sistema solar y es el único conocido hasta el momento en el que existe vida.	P	7
27	fauna	Conjunto de animales que habitan en una región o período geológico determinado.	F	7
28	flora	Conjunto de plantas que habitan en una región o periodo determinado, formando parte de la vegetación de un ecosistema.	F	7
29	cultivar	Preparar y trabajar la tierra para que produzca plantas.	C	7
30	organico	Relacionado con la materia orgánica o con los seres vivos. En el ámbito ambiental, se refiere a aquellos productos o materiales que provienen de organismos vivos y que pueden ser biodegradables.	O	7
31	efecto invernadero	El efecto invernadero es un fenómeno natural que se produce cuando determinados gases en la atmósfera retienen parte de la energía emitida por el Sol, lo que contribuye al calentamiento de la Tierra y ayuda a mantener una temperatura adecuada para la vida en nuestro planeta.	E	7
32	incendio forestal	Un incendio forestal es un fuego no controlado que se propaga rápidamente y afecta a bosques, selvas, áreas verdes y zonas naturales. Estos siniestros pueden tener un impacto devastador en el ecosistema, destruyendo la flora y la fauna, así como incrementando la emisión de gases de efecto invernadero a la atmósfera.	I	7
33	dioxidodecarbono	Compuesto químico formado por dos átomos de oxígeno y un átomo de carbono, que se produce principalmente por la combustión de combustibles fósiles y es uno de los principales gases de efecto invernadero responsables del calentamiento global.	D	7
34	monóxido de carbono	Gas tóxico e inodoro que se produce a partir de la combustión incompleta de materiales que contienen carbono, como la gasolina, el gas natural, la madera, entre otros. Puede ser muy peligroso para la salud humana al interferir en el transporte de oxígeno en la sangre.	M	7
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
3	Foro test	22	foro para probar insersión de datos	2024-04-05 18:02:32.863899
\.


--
-- Data for Name: mensajes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mensajes (contenido_mensaje, tema_id, usuario_id, fechapub_mensaje, id_mensajes) FROM stdin;
Hola mucho gusto, me encantaría hacer una propuesta de un proyecto interesante que tiene que ver con biodiversidad chicos!	3	25	2024-04-05 18:19:20.090086	1
Hola genial, me encantan los planes en la naturaleza! :)	2	31	2024-04-05 18:19:26.199019	2
Evento en la naturaleza??? me encanta, me apunto!	2	23	2024-04-05 18:20:11.153641	4
Hola gente, me gustaría apuntarme al plan de la naturaleza, me mola!!	2	15	2024-04-05 18:20:47.152317	5
\.


--
-- Data for Name: modulos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.modulos (id_modulo, descipcion, nombre_modulo) FROM stdin;
\.


--
-- Data for Name: puntuaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.puntuaciones (puntuaciontotal, usuario_id, quest_realizados, interacciones_tema, interacciones_mensaje, puntuaciones_foro) FROM stdin;
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
2	Evento de paseo por la naturaleza	A continuación, quería ver quien estaba interesado en ir de paseito por la naturaleza	3	10	2024-04-05 18:08:47.451762
3	Grupo de Iniciativas con Biodiversidad 	Bienvenidos!!, en este tema quería plantear un grupo para hacer iniciativas basadas en biodiversidad, espero que se animen	3	24	2024-04-05 18:10:46.795191
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id_usuario, nombre_usuario, apellido_usuario, email, contrasena, tipo_usuario, escuela_id, foto_usuario) FROM stdin;
49	francisco	ibarra	jguevara@midominio.com	$2b$10$e0hQWGVtS3r7NLSkoctfjOWMm8iRjLg4PnNbeOlPwS6VI1q0xUEpa	estudiante	1	\N
3	javier	guevara	jguevara@midominio.com	654321	estudiante	1	\N
4	francisco	ibarra	jguevara@midominio.com	$2a$06$IlTFv2ySVQnj2irAE6uW5e6sDoDTKbo15IvGI0nBadHmjUk235Aj6	estudiante	1	\N
7	gregorio	araque	educador@correo.com	$2b$10$So0xpv7fuHv1fxaqZiYgCOblfvcOVWkj4mM3wQQHWMbrK1g4d1PUq	educador	1	\N
41	francisco	ibarra	jguevara@midominio.com	$2b$10$qqZBX.MnunzYRTf0sbtRmuMzEEDzs5uT1cE7iwzKkXFN7yrdsNXwC	estudiante	1	\N
42	francisco	ibarra	jguevara@midominio.com	$2b$10$QYtyie.pcxPLp8MEen5ybe3gLPbZd22rJbTBuH5pLP7izPXC.os5O	estudiante	1	\N
9	John	Doe	john.doe@example.com	$2b$10$vqrediaXTxH5N/vFDDGwhe3DH5xK5qfEAsbelhgjSye2bYOrbCkzu	estudiante	1	\\x696d6167656e5f64655f70657266696c2e6a7067
10	John	Doe	john.doe@example.com	$2b$10$D0F9O7ONKs/MWtu2DxZRBeHFl/kdt2ecF42ZzTTvmOmA3JsV4gpuu	estudiante	1	\\x696d6167656e5f64655f70657266696c2e6a7067
11	John	Doe	john.doe@example.com	$2b$10$cnLK5EYY2iygc1Okd2PgaeXWeSnnFSI5czZwT4deNat.2N6GO93Ye	estudiante	1	\N
12	John	Doe	john.doe@example.com	$2b$10$Thcpfaqe74lgEAzNJ8Z4j.vUchGZcykma.cIXHEIPlRZ5d/iHrDpS	estudiante	1	\N
13	John	Doe	john.doe@example.com	$2b$10$RBW98WPykv5hLmsz.MdIsuUPciWIqvErTBItBKeai..epd7wAj3Bq	estudiante	1	\N
14	John	Doe	john.doe@example.com	$2b$10$CcACVMfuwdYKA7J73Z1dCu87/hjz0szt78Sb7XcPO8CqA/h7/eVg.	estudiante	1	\N
15	John	Doe	john.doe@example.com	$2b$10$NEimmuUHVcjjwiJDMZ/3YeRJx8mlDbe2HfF1c0sAzUox6abChaTcG	estudiante	1	\N
16	John	Doe	john.doe@example.com	$2b$10$aK7Vu73dN6MFyc4yk7nawumX/jeWqOxbmZUjP33gOYvty7nu.Evyu	estudiante	1	\N
17	John	Doe	john.doe@example.com	$2b$10$n2jyq7tZ89L42e/DiYtUS.2YCl6GMqgaJkM74U5ZK7iE3ykm8TulW	estudiante	1	\N
18	John	Doe	john.doe@example.com	$2b$10$3v4A/UOk.4xUk5kjue2/Ue5k4dpsqZ0i9bU/wdnsw8t6JNZvftn1C	estudiante	1	\N
19	John	Doe	john.doe@example.com	$2b$10$/eFc0JzX4hrJvbGUKjqice466sbRfyBaxaMqS3dB/kjtJ3ZuAp3h6	estudiante	1	\\x696d6167656e2e6a7067
20	John	Doe	john.doe@example.com	$2b$10$VpAE4B5/NwUhNw2A4wa6KOfPqJHv5dP1h0AeaivMTRAWzeL7zfnhu	estudiante	1	\N
21	John	Doe	john.doe@example.com	$2b$10$5Qo4iYM62iKhUQ83fHf0RemDsrFuoJKhj.fN8WeBGBPjM/Gevv8Hm	estudiante	1	\N
22	John	Doe	john.doe@example.com	$2b$10$3AHTAcUdLIIn9BN4Xh7TR.ZHmzbjj1Bh0o76TxZ/F3Gtq6Rv6wvCq	estudiante	1	\N
23	John	Doe	john.doe@example.com	$2b$10$pyem/4jtLiCFvH9wIHmnPuKVtHVO5uxCtx0Me.GV/WmXg8mWxbdke	estudiante	1	\N
24	John	Doe	john.doe@example.com	$2b$10$P4dJklIHVAAfrw7brngf2.CDO6SCyuzTTNQUQLOn6wa2WJdGCr9yK	estudiante	1	\N
25	francisco	ibarra	jguevara@midominio.com	$2b$10$B1xO7k/VI8vM.QSVI/bHs./lcGjqDcuvK7hJV0wfjmGKXXd7gaLdW	estudiante	1	\N
26	francisco	ibarra	jguevara@midominio.com	$2b$10$7gDD9IZ9d9y/zFbe8ItbJutzmtBIBaSRpyzF40E3KquH0F0GUvNFe	estudiante	1	\N
27	francisco	ibarra	jguevara@midominio.com	$2b$10$ldf4OoBzmGYXtqjC6/OyV.muuE4x9w9eQvpg5zL6KA0ssfm/6DW2G	estudiante	1	\N
28	francisco	ibarra	jguevara@midominio.com	$2b$10$j9gB/GWnZVT8p1dBHKBPcOakO9piwy2CVtpV1y.3zGx4ceVat/HCq	estudiante	1	\N
29	francisco	ibarra	jguevara@midominio.com	$2b$10$341PVlWYHJHihdCRq76MO.b1AArS2avu2oaMkeQl.3rDgwC.KJCm2	estudiante	1	\N
30	francisco	ibarra	jguevara@midominio.com	$2b$10$98C3MK1pqfQkeEf3vN9SX.sdwvhxhMrM3kaqMQaSvOCfXnJ21DrsO	estudiante	1	\N
31	francisco	ibarra	jguevara@midominio.com	$2b$10$t66y1bmTMhE2.E8xPVl5n.suct4Q.67vP3jcWjRSTqzhZmPoDq45i	estudiante	1	\N
32	francisco	ibarra	jguevara@midominio.com	$2b$10$L./isJzj.gdZSvT451c7leU.15ivcr6lAbacbYUZF6Zr.OolE1UWa	estudiante	1	\N
33	francisco	ibarra	jguevara@midominio.com	$2b$10$7aZStm8q9KQ4a2W1cwBJ5OpBaQGnB1928uDaHDy.XT2Aps0V/oMLm	estudiante	1	\N
43	francisco	ibarra	jguevara@midominio.com	$2b$10$bsN0NAhugHxHEioSj0gqAO5Vxy7ze4k/Sdvgl996sY8NXhQcit/x2	estudiante	1	\N
34	francisco	ibarra	jguevara@midominio.com	$2b$10$/ilO1OZyVDxv.k60rnDAhOaJuAeCmcDUDqZKWOv2KkK.7KYnxZo8q	estudiante	1	\N
50	francisco	ibarra	jguevara@midominio.com	$2b$10$Jb45yIrh5.eBVPsKiWpsSuz7wAe.bQ./RvlTWUo4vPlLJGh61Pvse	estudiante	1	\N
35	francisco	ibarra	jguevara@midominio.com	$2b$10$vxQ9i0TwZlCGeAWERWWle.qzSIq/rpY5a6tfhjaBRbyfTELebNYZi	estudiante	1	\N
51	usertest	testuser	estudiante12@correo.com	$2b$10$n.cXFO0tOoT4jBz9P/RClucLfwYzRXrc9zjTm/pCFH/YqkfM9ndRO	estudiante	1	\N
53	Pedrito	Gonzalez	pgzl@correo.com	$2b$10$4P9V0HMxFliqIxCq2tx/6O/CgC/xsFwzP2pRlqgJJYHEVTuWGNujW	estudiante	1	\N
2	francisco	ibarra	jguevara@midominio.com	$2b$10$kOrc0SCEzDD66aJ/LGjMyulS.fzeNm0tMHUegVE6YdNHKfE7zZS5u	estudiante	1	\N
57	Gonzalo	Perez	gperez19@correo.com	$2b$10$OqwXZVQ2FhX/W6nJ07qdNOqfxxck6Vw1g2o7v4zwvAvdAm4Jo1Qgq	estudiante	1	\N
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

SELECT pg_catalog.setval('public.diccionarioeco_id_diccionario_seq', 34, true);


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

SELECT pg_catalog.setval('public.foro_id_foro_seq', 3, true);


--
-- Name: mensajes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mensajes_id_seq', 5, true);


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

SELECT pg_catalog.setval('public.temas_id_tema_seq', 3, true);


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

SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 57, true);


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
    ADD CONSTRAINT pk_puntuaciones PRIMARY KEY (usuario_id);


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
-- Name: foro trigger_fecha_publicacion_foro; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_fecha_publicacion_foro BEFORE INSERT ON public.foro FOR EACH ROW EXECUTE FUNCTION public.calcular_fecha_publicacion_foro();


--
-- Name: mensajes trigger_fecha_publicacion_mensajes; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_fecha_publicacion_mensajes BEFORE INSERT ON public.mensajes FOR EACH ROW EXECUTE FUNCTION public.calcular_fecha_publicacion_mensajes();


--
-- Name: temas trigger_fecha_publicacion_temas; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_fecha_publicacion_temas BEFORE INSERT ON public.temas FOR EACH ROW EXECUTE FUNCTION public.calcular_fecha_publicacion_temas();


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

