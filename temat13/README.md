Responsive Web Design a SEO
===========================

 
- Google zaleca stosowanie RWD, ale… sam go nie stosuje w swoich produktach
- Media queries są obsługiwane przez Google od 2011 roku i brane pod uwagę przy indeksowaniu treści
- Niestety od strony praktycznej nie zawsze to się sprawdza - lepszy efekt pozycjonowania uzyskuję się przy stosowaniu RESS

RWD vs Google
-------------

*Wskazówki praktyczne dot. SEO*

- Nie duplikujmy treści strony - nawet z display: none;
- Linki nawigacji (np. oddzielne dla wersji mobile i desktop), które prowadzą w obrębie strony mogą być duplikowane i ukrywane za pomocą display: none; - nie wpływa to negatywnie na pozycjonowanie
- Zewnętrzne linkowania nie mogą się duplikować, ani być ukryte
- Javascript dla RWD powinien być wspólnym plikiem dla wszystkich wersji strony. Google jest w stanie uwzględnić warunki w nim zawarte dla różnych rozdzielczości
- Czas ładowania strony (waga obrazków, ilość requestów) ma wpływ na pozycję w wyszukiwarce

RWD SEO, a biznes
-----------------

Podejście RESS przy serwowaniu różnej wersji strony w zależności od User-Agent pozwala na dobór słów kluczowych i treści, które mają być zaindeksowane przez Google dla danego urządzenia.

Ukrywanie elementów w RWD a SEO
-------------------------------

- display:none, off-screen, …
- Google nie lubi ukrytego tekstu i linków
- Czy atrybuty “aria-hidden” albo “hidden” rozwiązują ten problem?

Atrybut *aria-hidden*
-------------------

- informuje czytnik (assistive technology), że element jest niewidoczny
- nie powoduje ukrycia elementu w przeglądarce
- brak informacji, że Google traktuje wyjątkowo ukryte elementy z tym atrybutem

Atrybut hidden (HTML5)
----------------------

- informuje, że element jest nieistotny
- nowe przeglądarki ukrywają taki element (skutek taki sam, jak przy display:none)
- brak informacji, że Google traktuje wyjątkowo ukryte elementy z tym atrubutem

Ukrywanie (usuwanie) elementów przez JS
---------------------------------------

- Google akceptuje modyfikowanie struktury za pomocą JavaScript.

RWD a RESS
==========

Co to jest RESS?
----------------

- Responsive Design with Server Side components
- W skrócie: RESS serwuje odpowiednią wersję strony dla odpowiedniego urządzenia na podstawie Nagłówka User Agent, wykorzystując jeden adres url, np może ukrywać pewne fragmenty witryny.
- Działa analogiczne jak media-queries z tym ze po stronie serwera. 

Możliwości RESS
===============

- Kompresja obrazków w zależności od wersji strony.
- Serwuje odpowiednie elementy strony dla odpowiedniego urządzenia np. obrazki, css’y, java script

Zagrożenie?
-----------

- Czy otrzymując różną treść pod jednym adresem dla wersji mobilnych wartość witryny nie spadnie?

Googlebot Mobile
----------------

**Typy klientów komórkowego Googlebota (User-Agent):** 

*Feature phones Googlebot-Mobile:*

- SAMSUNG-SGH-E250/1.0 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Browser/6.2.3.3.c.1.101 (GUI) MMP/2.0 (compatible; Googlebot-Mobile/2.1; +http://www.google.com/bot.html)
- DoCoMo/2.0 N905i(c100;TB;W24H16) (compatible; Googlebot-Mobile/2.1; +http://www.google.com/bot.html)

*Smartphone Googlebot-Mobile:*

- Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25 (compatible; Googlebot-Mobile/2.1; +http://www.google.com/bot.html)


Zagrożenie? Odp: nie
--------------------

Roboty Google są w stanie rozpoznać wersję strony.

Używając nagłówek HTTP “Vary: User-Agent” robot wie że strona może różnić się dla różnych wersji. 

Przykład odpowiedzi HTTP
------------------------

GET /page-1 HTTP/1.1Host: www.example.comUser-Agent: Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19(...rest of HTTP request headers...)

HTTP/1.1 200 OKContent-Type: text/htmlVary: User-AgentContent-Length: 5710(... rest of HTTP response headers...)

Źródła
------

https://developers.google.com/webmasters/smartphone-sites/
https://developers.google.com/webmasters/smartphone-sites/javascripthttp://searchengineland.com/how-common-are-seo-problems-with-responsive-web-design-152672http://mobiforge.com/designing/blog/why-responsive-web-design-not-always-best-option-a-mobile-seo-strategyhttp://moz.com/ugc/responsive-web-design-the-ultimate-guide-for-online-marketers
https://support.google.com/webmasters/answer/66353
http://www.w3.org/TR/wai-aria/states_and_properties#aria-hidden
http://dev.w3.org/html5/markup/global-attributes.html#common.attrs.hidden
