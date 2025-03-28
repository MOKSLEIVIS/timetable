PGDMP      7    
            }            kitm    16.4    16.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    17475    kitm    DATABASE     ~   CREATE DATABASE kitm WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Lithuanian_Lithuania.1257';
    DROP DATABASE kitm;
                postgres    false            �            1259    17485    groups    TABLE     7   CREATE TABLE public.groups (
    name text NOT NULL
);
    DROP TABLE public.groups;
       public         heap    postgres    false            �            1259    17500    teachers    TABLE     �   CREATE TABLE public.teachers (
    first_name text NOT NULL,
    classroom text NOT NULL,
    subject text NOT NULL,
    last_name text NOT NULL,
    teacher_group text,
    teacher_id integer NOT NULL
);
    DROP TABLE public.teachers;
       public         heap    postgres    false            �            1259    17505    teachers_teacher_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teachers_teacher_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.teachers_teacher_id_seq;
       public          postgres    false    220            �           0    0    teachers_teacher_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.teachers_teacher_id_seq OWNED BY public.teachers.teacher_id;
          public          postgres    false    221            �            1259    17495 	   timetable    TABLE     �   CREATE TABLE public.timetable (
    tgroup text NOT NULL,
    teacher text NOT NULL,
    classroom text NOT NULL,
    lesson text NOT NULL,
    day_lnum text NOT NULL,
    week text NOT NULL
);
    DROP TABLE public.timetable;
       public         heap    postgres    false            �            1259    17477    users    TABLE     t   CREATE TABLE public.users (
    user_id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    17476    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false    216            �           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          postgres    false    215            �            1259    17490    weeks    TABLE     6   CREATE TABLE public.weeks (
    name text NOT NULL
);
    DROP TABLE public.weeks;
       public         heap    postgres    false            ,           2604    17506    teachers teacher_id    DEFAULT     z   ALTER TABLE ONLY public.teachers ALTER COLUMN teacher_id SET DEFAULT nextval('public.teachers_teacher_id_seq'::regclass);
 B   ALTER TABLE public.teachers ALTER COLUMN teacher_id DROP DEFAULT;
       public          postgres    false    221    220            +           2604    17480    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    216    215    216            �          0    17485    groups 
   TABLE DATA           &   COPY public.groups (name) FROM stdin;
    public          postgres    false    217   *       �          0    17500    teachers 
   TABLE DATA           h   COPY public.teachers (first_name, classroom, subject, last_name, teacher_group, teacher_id) FROM stdin;
    public          postgres    false    220   G       �          0    17495 	   timetable 
   TABLE DATA           W   COPY public.timetable (tgroup, teacher, classroom, lesson, day_lnum, week) FROM stdin;
    public          postgres    false    219   d       �          0    17477    users 
   TABLE DATA           <   COPY public.users (user_id, username, password) FROM stdin;
    public          postgres    false    216   �       �          0    17490    weeks 
   TABLE DATA           %   COPY public.weeks (name) FROM stdin;
    public          postgres    false    218   �       �           0    0    teachers_teacher_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.teachers_teacher_id_seq', 19, true);
          public          postgres    false    221            �           0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 3, true);
          public          postgres    false    215            2           2606    17513    teachers teachers_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (teacher_id);
 @   ALTER TABLE ONLY public.teachers DROP CONSTRAINT teachers_pkey;
       public            postgres    false    220            0           2606    17515    timetable test 
   CONSTRAINT     h   ALTER TABLE ONLY public.timetable
    ADD CONSTRAINT test PRIMARY KEY (tgroup, lesson, day_lnum, week);
 8   ALTER TABLE ONLY public.timetable DROP CONSTRAINT test;
       public            postgres    false    219    219    219    219            .           2606    17484    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            �      x������ � �      �      x������ � �      �      x������ � �      �   R   x�3�LL����T1JR1�P��vq��
6-2v�,�(1	�(��t�̉H7�)w,�t)7��H�(����5��r7����� 7+�      �      x������ � �     