*The code of this tutorial has been tested with the 2.2 release of the
Ocsigen bundle.*  

# Introduction

This tutorial is an overview of the main features of the Ocsigen
framework. It explains how to program Web sites and client-server Web
applications in *OCaml* using *Eliom*, *Lwt*, *Js_of_ocaml* and the
other software of the Ocsigen project. Read it to understand the basics,
then refer to each project's manual for more detail.

*Warning:* This programming guide assumes you know the *OCaml* language,
and that you have a working installation of *Ocsigen server*, *Eliom*,
*Lwt*, *Js_of_ocaml*, (and *O'Closure* for some examples). In
particular, you need to have the interfaces (cmi) installed for all
these packages. They are sometimes in separate packages ("`-dev`"
packages in Debian/Ubuntu). We recommend to use the packages from your
distribution if they are available. If not, try to install all OCaml
related packages with the bundle we provide, or using
[Godi](http://godi.camlcity.org). If it does not work, please report the
problem to the package maintainers. We recommend to use the source
packages only if you want to test unreleased features from development
versions.

\<\<\|BB consider splitting into

- technical requirements (ocaml, ocsigen, cairo(!))
- intelectual requirements (knowledge of the OCaml language)
- how to get help (i.e. mail, and what embedded IRC chat?) \>\>

The first section of this introduction lists our main software projects.
The second section is an overview of the tutorial. In the following
chapters, we will show how to build step by step a small client/server
Web application.

\<\<wip\| Manuals are permanently under evolution. Please report any
error, mistake, and send us your comments and suggestions! \>\>

## Ocsigen software projects

Most projects are independent and can be used for non Eliom-releated
applications, for example:

- the cooperative threading library Lwt,
- the TyXML library for generating typed XML,
- the database query library Macaque,
- the Js_of_ocaml compiler (from Ocaml bytecode to Javascript),
- the O'Closure library, a binding for the Google closure Javascript
  widget library to be used with Js_of_ocaml,
- the Ocsigen server Web server.

### Ocsigen server

*Ocsigen server* is a full featured Web server written in modular way.
It implements most features of the HTTP protocol, and has a very
powerful extension mechanism that make very easy to plug your own OCaml
modules for generating pages. Many extensions are already written:
;\<\<a_manual project="ocsigenserver" chapter="staticmod"\|Staticmod\>\>
: is an extension to serve static files. ;[Eliom](wiki("eliom"):) : is
an extension to create reliable client/server Web applications or Web
sites in OCaml using advanced high level concepts. ;\<\<a_manual
project="ocsigenserver"
chapter="extendconfiguration"\|Extendconfiguration\>\> : allows for more
options in the configuration file. ;\<\<a_manual project="ocsigenserver"
chapter="accesscontrol"\|Accesscontrol\>\> : allows to restrict the
access to the sites from the config file (to request coming from a
subnet, containing some headers, etc.). ;\<\<a_manual
project="ocsigenserver" chapter="authbasic"\|Authbasic\>\> : allows to
restrict the access to the sites from the config file using Basic HTTP
Authentication. ;\<\<a_manual project="ocsigenserver"
chapter="cgimod"\|CGImod\>\> : is an extension to serve CGI scripts. It
may also be used to serve PHP through CGI. ;\<\<a_manual
project="ocsigenserver" chapter="deflatemod"\|Deflatemod\>\> : is an
extension used to compress data before sending to the client.
;\<\<a_manual project="ocsigenserver"
chapter="redirectmod"\|Redirectmod\>\> : is an extension to set
redirections towards other Web sites from the configuration file.
;\<\<a_manual project="ocsigenserver" chapter="revproxy"\|Revproxy\>\> :
is a reverse proxy for Ocsigen server. It allows to ask another server
to handle the request. ;\<\<a_manual project="ocsigenserver"
chapter="rewritemod"\|Rewritemod\>\> : is a module to make changes in
incoming requests before sending them to other extensions. ;\<\<a_manual
project="ocsigenserver" chapter="outputfilter"\|Outputfilter\>\> :
allows to rewrite some parts of the output before sending it to the
client. ;\<\<a_manual project="ocsigenserver"
chapter="userconf"\|Userconf\>\> : allows users to have their own
configuration files. ;\<\<a_manual project="ocsigenserver"
chapter="comet"\|Comet\>\> : makes server to client communications
possible.

Ocsigen server has a sophisticated configuration file mechanism allowing
complex configurations of sites.

### Eliom

Eliom is an extension for *Ocsigen server* that allows the creation of
reliable client/server Web applications (or traditional dynamic
Websites) in OCaml. It implements many new concepts, and as a result,
its approach to application development is very different from all other
Web programming tools.

#### Expressiveness

Eliom enables the creation of complex Web sites in very few lines of
code, by providing high level programming primitives for many aspects of
Web programming: communication between the client and the server,
implementation of complex Web interaction, sessions, etc.

#### Static typing

Eliom also improves the stability of your application by making
extensive use of OCaml's static typing. The compiler checks many things
for you, helping you to remove many bugs. For example, the validity of
pages (e.g. well-formed HTML) is checked at compile time! Moreover,
Eliom also statically checks, for example, that your Web site does not
contain broken links or that the parameters in a link or a form
correspond to the service it leads to (and many other things).

#### A client/server application in one piece of code!

But one of the most significant features of Eliom is that it allows to
program both sides of a Web application as a single program. The client
side parts are automatically extracted and compiled into Javascript to
be executed in the browser. The communication between the server is
straightforward (in both directions!), as you can use server side values
in the client side code.

Note that client side features can be mixed with traditional Web
interaction (links, forms, bookmarks, back button ...)

#### Security

Eliom helps you to make your Web application secure by automatically
addressing several common security issues (code injection, session
fixation~ ...) and by providing features to implement very secure
behaviours (avoiding for example "cross-site request forgery").  

### Lwt

*Lwt* is a cooperative thread library for OCaml. It provides an
alternative to the more usual preemptive threads approach for
programming concurrent applications, that avoids most problems of
concurrent data access and deadlocks. It is used by Ocsigen server and
Eliom and has now become a standard way to implement concurrent
applications in OCaml. All your Web sites must be written in
Lwt-compatible way!

### Js_of_ocaml

*Js_of_ocaml* is a compiler of OCaml bytecode to Javascript. It makes it
possible to run Ocaml programs in a Web browser. Its key features are
the following:

- The whole language, and most of the standard library are supported.
- The compiler is easy to install: it only depends on Findlib and Lwt.
- The generated code is independant of Eliom and the Ocsigen server. You
  can use it with any Web server.
- You can use a standard installation of OCaml to compile your programs.
  In particular, you do not have to recompile a library to use it with
  Js_of_ocaml. You just have to link your program with a specific
  library to interface with the browser APIs.

### Macaque

*Macaque* is a library for safe and flexible database queries using
comprehensions.

### O'Closure

*O'Closure* is a binding for the Google Closure Javascript widget
library. It makes possible to write dynamic user interfaces for Web
pages in OCaml using Js_of_ocaml.

## Overview of the tutorial

The goal of this tutorial is to give an overview of the features the
Ocsigen framework brings to build Web applications. It will allow you to
understand the philosophy of Eliom (the Web programming framework in
OCaml), and are also a good starting point to understand other libraries
of the Ocsigen project: Lwt, Macaque, etc.

Theses chapters do not aim at exhaustiveness but many references towards
other chapters are made all along the text, so that you can learn the
concepts in detail if you want to.

We assume the reader has a good knowledge of the Objective Caml
language.  

Next chapter is a tutorial for writing a small client/server
[collaborative drawing application](site:graffiti/). You will learn how
to:

- Create new *services*
- Output *valid HTML*
- Send *OCaml code* to be executed *on the client*
- Call *Javascript methods* from OCaml
- Catch *mouse events*
- *Communicate* with the server, in both directions
- Use the *O'Closure* widget library
- Create services with *non-HTML output*

The following chapter is devoted to server side programming. We will
create a new Web site with several pages and user connection. In this
chapter, you will learn how to:

- Create a *link* towards another service
- Create *forms*
- Register *session data* or *session services*
- Create services performing *actions* (with no output)
- Dynamically register new services (*continuation based* Web
  programming)

The last chapter is an overview of miscellaneous features. We will mix
the application from the two previous chapters to produce a multi-user
collaborative drawing application. In this chapter, you will learn how
to:

- Integrate a typical Web interaction (links, forms,~ …) with a client
  side program.
- Use *Macaque* for safe database interaction
- Add *sounds or videos* to your application
- Change pages *without stopping the client side program*
- Connect with external accounts (*openID*)
- Add an Atom stream

If you are not interested in client-side programming you can safely skip
most of the first chapter (although we recommend you read at least the
first section, which explains the basics). Conversely, if you are not
interested in standard Web interactions, with sessions links, and forms,
you can skip the second chapter.

Keep in mind that one of the key feature of Eliom is that it allows one
to mix commonplace Web interactions (URLs, forms, links, bookmarks, back
button) with dynamic client side features. In particular, the
client-side program **does not stop** when the user clicks a link, sends
a form, or presses the back button--yet the user still can save
bookmarks on pages! This opens up a wide field of new possibilities, and
should facilitate the emergence of new kinds of Web applications.
