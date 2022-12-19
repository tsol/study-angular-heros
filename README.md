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
