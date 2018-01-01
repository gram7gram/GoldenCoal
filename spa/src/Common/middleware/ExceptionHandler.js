import Raven from 'raven-js'
import createRavenMiddleware from "raven-for-redux";

if (process.env.NODE_ENV === 'production') {
    Raven.config('https://__TOKEN__@sentry.io/__ID__'
        .replace('__TOKEN__', __GC_SPA_PARAMETERS__.monitoring.token)
        .replace('__ID__', __GC_SPA_PARAMETERS__.monitoring.project), {
        release: __GC_SPA_PARAMETERS__.version
    }).install()
}

const enableMonitoring = options => createRavenMiddleware(Raven, options)

export {
    Raven,
    enableMonitoring
}