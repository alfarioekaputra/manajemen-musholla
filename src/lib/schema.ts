import {
  pgTable,
  date,
  text,
  pgEnum,
  uuid,
  timestamp,
  numeric,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("role", ["admin", "bendahara", "viewer"]);
export const accountTypeEnum = pgEnum("account_type", ["masuk", "keluar"]);
export const planEnum = pgEnum("plan", ["free", "pro", "enterprise"]);
export const subscriptionStatusEnum = pgEnum("status", [
  "active",
  "canceled",
  "trialing",
]);

export const tenants = pgTable("tenants", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow(),
});

// USERS
export const users = pgTable("users", {
  id: uuid("id").primaryKey(), // Auth user ID (from Supabase)
  tenantId: uuid("tenant_id").references(() => tenants.id, {
    onDelete: "set null",
  }),
  fullName: text("full_name"),
  role: userRoleEnum("role").default("viewer").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// ACCOUNTS
export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  type: accountTypeEnum("type").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// TRANSACTIONS
export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),
  accountId: uuid("account_id").references(() => accounts.id),
  userId: uuid("user_id").references(() => users.id),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  description: text("description"),
  date: date("date").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// BALANCES
export const balances = pgTable("balances", {
  accountId: uuid("account_id")
    .primaryKey()
    .references(() => accounts.id, { onDelete: "cascade" }),
  tenantId: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),
  balance: numeric("balance", { precision: 12, scale: 2 })
    .notNull()
    .default("0"),
});

// SUBSCRIPTIONS (opsional SaaS tier)
export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").references(() => tenants.id, {
    onDelete: "cascade",
  }),
  plan: planEnum("plan").notNull(),
  status: subscriptionStatusEnum("status").notNull(),
  startedAt: timestamp("started_at").defaultNow(),
  endsAt: timestamp("ends_at"),
});
