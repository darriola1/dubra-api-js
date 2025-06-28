# dubra-api.js

Directory structure:
├── .env.template
├── README.md
├── package.json
├── prisma
│   ├── migrations
│   │   ├── 20250626144437_init
│   │   │   └── migration.sql
│   │   ├── 20250627024417_add_role_to_user
│   │   │   └── migration.sql
│   │   ├── 20250627231058_model_fixes
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
└── src
    ├── app.js
    ├── controllers
    │   ├── auth.controller.js
    │   ├── order.controller.js
    │   └── shipping.controller.js
    ├── middlewares
    │   ├── auth.middleware.js
    │   └── validate.middleware.js
    ├── models
    │   ├── order.model.js
    │   ├── shipping.model.js
    │   └── user.model.js
    ├── routes
    │   ├── auth.routes.js
    │   ├── order.routes.js
    │   └── shipping.routes.js
    ├── schemas
    │   ├── auth.schema.js
    │   ├── order.schema.js
    │   └── shipping.schema.js
    ├── services
    │   └── recaptcha.js
    └── utils
        └── logger.js