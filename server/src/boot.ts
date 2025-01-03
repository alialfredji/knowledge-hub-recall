import hookApp from '@alialfredji/hook-app';
import type { HookContext } from './types';

hookApp.run({
    trace: true,
    features: [],
    services: [
        require('./service-fastify'),
    ],
    settings: {},
});

/*
Result in console
---------------------

testHook payload: Hello World!

=================
Boot Trace:
=================

▶ feature1 ◇ init::feature
  ▶ feature1 » testHook
♦ app/trace ◇ finish
*/
