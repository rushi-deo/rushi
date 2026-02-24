-- Super Admin singleton constraint (global)
CREATE UNIQUE INDEX IF NOT EXISTS one_super_admin_only
ON "User" ((role))
WHERE role = 'SUPER_ADMIN' AND "deletedAt" IS NULL;
