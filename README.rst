Go SMS Llama
============

Llama @vumigo jsbox app for @arbitraryuser.

1. Accept SMS assume it has a keyword.
2. Post to URL as JSON
3. Read JSON response from URL, send reply.

Payloads
~~~~~~~~

From Vumi to URL::

    {
        "keyword": "foo"
    }

In URL response::

    {
        "content": "Hi there!"
    }


Install & Test
~~~~~~~~~~~~~~

::

    $ npm install .
    $ ./node_modules/.bin/mocha -R spec

|travis|_

.. |travis| image:: https://travis-ci.org/smn/go-sms-llama.png?branch=develop
.. _travis: https://travis-ci.org/smn/go-sms-llama
