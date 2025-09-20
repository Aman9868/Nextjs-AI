🔸 How Each Folder Works

app/ → Pages & layouts.

context/ → Auth + Theme context.

hooks/ → Reusable hooks (useAuth, useTheme).

lib/ → Axios client setup, helpers.

components/ → Forms, buttons, reusable UI.

middleware.js → Route protection at server side.

This keeps contexts decoupled from components, and scales well when your app grows (e.g. multiple auth flows, dashboards, admin panels).