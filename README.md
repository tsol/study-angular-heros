# AngularHeroes

This is a standart Tour of Heroes Tutorial example with added i18n and ELF state manager.

# i18n

Since native i18n approach is used in this application - there is no standart
way to switch languages and locales at runtime. In standart angular way you must build
application for each language to /lang/ folder on the server and then staticly route
users to these folders.

To test out both English and Russian languages in this project - change
angular.json file in the root folder. Under 'build' section remove
"localize": ["ru"] line to run application in default language (which is english).

# elf manager

For the state manager part of task i decided to pretend like we have a huge
application and dont want to mess around changing our components.
So we replace existing hero.service (which originaly was talking to http server)
with our state service, which will act like a cache.

So we rename original hero.service to hero-http.service and implement state
service with same methods in its place. We also make sure to call old http
back end to keep data on the server in sync with our state.

...

Ok now having though about it, thats not the way. Since http observables are
odinary observables - which means they only fire once - and ELF's observables
are BeheiviorSubject - which means they will fire up continiously.

Futhermore when list of items is displayed - we better use truly reactive approach
and refer "observable$ | async" right in the template. And at the same time - editing
logic, where we fetch one hero to edit - doesnt require any reactivity.

So, to sum up, we have to refactor templates and change how hero.service works.
Whenever there is a data to display - we use observable from ELF, whenever there is a static request we just use ELFs state.query and when there is data alternation - we
update http first, if there's no error we change the state also.
