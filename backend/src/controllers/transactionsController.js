import { db } from "../config/db.js";
import { transactionsTable } from "../db/schema.js";
import { eq, desc, and, gt, lt } from "drizzle-orm";
import { sql } from "drizzle-orm";

export async function getTransactionsByUserId(req, res) {
  try {
    const { user_id } = req.params;

    const transactions = await db
      .select()
      .from(transactionsTable)
      .where(eq(transactionsTable.user_id, user_id))
      .orderBy(desc(transactionsTable.createdAt));
    res.status(200).json({ transactions });
  } catch (error) {
    console.log("Error getting the transactions", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createTransaction(req, res) {
  try {
    const { user_id, title, amount, category } = req.body;

    if (!user_id || !title || amount === undefined || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const transaction = await db.insert(transactionsTable).values({
      user_id,
      title,
      amount,
      category,
    });
    res.status(201).json({ message: "Transaction created", data: transaction });
  } catch (error) {
    console.log("Error creating the transaction", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteTransaction(req, res) {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }

    const result = await db
      .delete(transactionsTable)
      .where(eq(transactionsTable.id, id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.log("Error deleting the transaction", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getSummaryByUserId(req, res) {
  try {
    const { user_id } = req.params;

    const balanceResult = await db
      .select({
        balance: sql`COALESCE(SUM(${transactionsTable.amount}), 0)`.as(
          "balance"
        ),
      })
      .from(transactionsTable)
      .where(eq(transactionsTable.user_id, user_id));

    const incomeResult = await db
      .select({
        income: sql`COALESCE(SUM(${transactionsTable.amount}), 0)`.as("income"),
      })
      .from(transactionsTable)
      .where(
        and(
          eq(transactionsTable.user_id, user_id),
          gt(transactionsTable.amount, 0) // amount > 0
        )
      );

    const expenseResult = await db
      .select({
        expense: sql`COALESCE(SUM(${transactionsTable.amount}), 0)`.as(
          "expense"
        ),
      })
      .from(transactionsTable)
      .where(
        and(
          eq(transactionsTable.user_id, user_id),
          lt(transactionsTable.amount, 0) // amount < 0
        )
      );

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expense: expenseResult[0].expense,
    });
  } catch (error) {
    console.log("Error getting the summary", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
