Go SMS Llama
============

Llama `Vumi Go <https://vumi.org/>`_ jsbox app for `@arbitraryuser <https://github.com/jonathanendersby>`_.

1. Accept SMS assume it has a keyword.
2. Post to URL as JSON
3. Read JSON response from URL, send reply.

Payloads
~~~~~~~~

From Vumi to URL::

    {
        "msisdn": "+1234567"
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
