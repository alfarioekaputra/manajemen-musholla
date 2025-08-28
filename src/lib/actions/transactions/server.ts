import "server-only";
import { db } from "@/lib/db";
import { eq, sql } from "drizzle-orm";
import { accounts, transactions } from "@/lib/schema";

export async function fetchTotalMasukByTenant(tenantId: string) {
  const [result] = await db
    .select({ total: sql<number>`COALESCE(SUM(${transactions.amount}), 0)` })
    .from(transactions)
    .innerJoin(accounts, eq(transactions.accountId, accounts.id)).where(sql`
      ${transactions.tenantId} = ${tenantId}
      AND ${accounts.type} = 'masuk'
      AND DATE_TRUNC('month', ${transactions.date}) = DATE_TRUNC('month', CURRENT_DATE)
    `);
  return result?.total ?? 0;
}

export async function fetchTotalKeluarByTenant(tenantId: string) {
  const [result] = await db
    .select({ total: sql<number>`COALESCE(SUM(${transactions.amount}), 0)` })
    .from(transactions)
    .innerJoin(accounts, eq(transactions.accountId, accounts.id)).where(sql`
      ${transactions.tenantId} = ${tenantId}
      AND ${accounts.type} = 'keluar'
      AND DATE_TRUNC('month', ${transactions.date}) = DATE_TRUNC('month', CURRENT_DATE)
    `);
  return result?.total ?? 0;
}

export async function fetchMasukByTenant(tenantId: string) {
  return db
    .select({
      id: transactions.id,
      amount: transactions.amount,
      description: transactions.description,
      date: transactions.date,
      accountName: accounts.name,
      accountType: accounts.type,
    })
    .from(transactions)
    .innerJoin(accounts, eq(transactions.accountId, accounts.id)).where(sql`
      ${transactions.tenantId} = ${tenantId}
      AND ${accounts.type} = 'masuk'
      AND DATE_TRUNC('month', ${transactions.date}) = DATE_TRUNC('month', CURRENT_DATE)
    `);
}

export async function fetchKeluarByTenant(tenantId: string) {
  return db
    .select({
      id: transactions.id,
      amount: transactions.amount,
      description: transactions.description,
      date: transactions.date,
      accountName: accounts.name,
      accountType: accounts.type,
    })
    .from(transactions)
    .innerJoin(accounts, eq(transactions.accountId, accounts.id)).where(sql`
      ${transactions.tenantId} = ${tenantId}
      AND ${accounts.type} = 'keluar'
      AND DATE_TRUNC('month', ${transactions.date}) = DATE_TRUNC('month', CURRENT_DATE)
    `);
}
