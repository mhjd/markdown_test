---
title: "My GitHub Page"
---

<link rel="stylesheet" type="text/css" href="styles.css">

# My Code Example
	
Client :

```ocaml
module Raw : 
  Html_sigs.Make(Xml)(Svg.D.Raw).T
        with type +'a elt = 'a elt
         and type +'a attrib = 'a attrib
```

Server :
```ocaml
module Raw : 
  Html_sigs.Make(Xml)(Svg.D.Raw).T
        with type +'a elt = 'a elt
         and type +'a attrib = 'a attrib
```

Shared
{.server}
```ocaml
let x = foo;;
```

## Client

<div class="language-ocaml">
<pre class="client">
module Raw : 
  Html_sigs.Make(Xml)(Svg.D.Raw).T
        with type +'a elt = 'a elt
         and type +'a attrib = 'a attrib
</pre></div>

## Server

<pre class="server"><code class="language-ocaml">
module Raw : 
  Html_sigs.Make(Xml)(Svg.D.Raw).T
        with type +'a elt = 'a elt
         and type +'a attrib = 'a attrib
</code></pre>

## Shared

<pre class="shared"><code class="language-ocaml">
let x = foo;;
</code></pre>
