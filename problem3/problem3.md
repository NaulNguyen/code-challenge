# 🔧 Computational Inefficiencies and Anti-Patterns Analysis

## 📋 Table of Contents

-   [Overview](#overview)
-   [Issues Identified](#issues-identified)
-   [Refactored Solution](#refactored-solution)

## 🎯 Overview

This document analyzes computational inefficiencies and anti-patterns in a React wallet component, providing detailed explanations and an optimized refactored version.

---

## 🚨 Issues Identified

### 1. ⚠️ **Redundant `getPriority` Calls**

**Problem:**

```typescript
// ❌ BAD: getPriority called multiple times for same balance
const sortedBalances = useMemo(() => {
    return balances
        .filter((balance) => {
            const balancePriority = getPriority(balance.blockchain); // Call 1
            // ... more logic
        })
        .sort((lhs, rhs) => {
            const leftPriority = getPriority(lhs.blockchain); // Call 2
            const rightPriority = getPriority(rhs.blockchain); // Call 3
            // ... sort logic
        });
}, [balances, prices]);
```

**Impact:** `O(n²)` complexity for sorting due to redundant calculations

**Solution:** Calculate priority once and store it

```typescript
// ✅ GOOD: Calculate priority once
const balancesWithPriority = balances.map((balance) => ({
    ...balance,
    priority: getPriority(balance.blockchain), // Call once per balance
}));
```

---

### 2. 🐛 **Incorrect Filtering Logic**

**Problem:**

```typescript
// ❌ BAD: Uses undefined variable and inverted logic
.filter((balance) => {
  const balancePriority = getPriority(balance.blockchain);
  if (lhsPriority > -99) { // ❌ lhsPriority is undefined!
    if (balance.amount <= 0) {
      return true; // ❌ Returns items with amount <= 0
    }
  }
  return false;
})
```

**Impact:** Runtime error + incorrect filtering behavior

**Solution:** Fix variable reference and logic

```typescript
// ✅ GOOD: Correct filtering logic
.filter((balance) => {
  return balance.priority > -99 && balance.amount > 0;
})
```

---

### 3. 🔄 **Unnecessary Dependency in `useMemo`**

**Problem:**

```typescript
// ❌ BAD: prices not used in sortedBalances calculation
const sortedBalances = useMemo(() => {
    return balances.filter(/* ... */).sort(/* ... */);
}, [balances, prices]); // ❌ prices causes unnecessary recalculation
```

**Impact:** Unnecessary re-calculations when prices change

**Solution:** Remove unused dependency

```typescript
// ✅ GOOD: Only include used dependencies
const sortedBalances = useMemo(() => {
    // ... calculation logic
}, [balances]); // Only depends on balances
```

---

### 4. 🔄 **Sequential Map Operations**

**Problem:**

```typescript
// ❌ BAD: Multiple iterations over same data
const formattedBalances = sortedBalances.map((balance) => ({
    ...balance,
    formatted: balance.amount.toFixed(),
}));

const rows = formattedBalances.map((balance) => (
    <WalletRow key={index} {...balance} />
));
```

**Impact:** `O(2n)` instead of `O(n)` complexity

**Solution:** Combine operations

```typescript
// ✅ GOOD: Single iteration
const rows = sortedBalances.map((balance) => (
    <WalletRow
        key={balance.currency}
        formatted={balance.amount.toFixed()}
        {...balance}
    />
));
```

---

### 5. 🔑 **Anti-pattern: `key={index}`**

**Problem:**

```typescript
// ❌ BAD: Index as key causes React rendering issues
{
    rows.map((row, index) => <WalletRow key={index} {...row} />);
}
```

**Impact:** Incorrect component state when list reorders

**Solution:** Use unique, stable identifiers

```typescript
// ✅ GOOD: Unique key
{
    rows.map((row) => <WalletRow key={row.currency} {...row} />);
}
```

---

### 6. 📝 **Missing Interface Properties**

**Problem:**

```typescript
// ❌ BAD: Missing blockchain property
interface WalletBalance {
    currency: string;
    amount: number;
    // blockchain: string; // ❌ Missing but used in code
}
```

**Impact:** TypeScript errors and runtime issues

**Solution:** Complete interface definition

```typescript
// ✅ GOOD: Complete interface
interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string; // ✅ Added missing property
}
```

---

## 🛠️ Refactored Solution|

### 🎯 **Complete Refactored Code**

```typescript
import React, { useMemo } from "react";

// 📋 Properly defined interfaces
interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string; // ✅ Added missing property
}

interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
    usdValue: number;
    priority: number; // ✅ Added for optimization
}

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {}
interface Props extends BoxProps {}

// 🎯 Priority calculation function
const getPriority = (blockchain: string): number => {
    const priorities: Record<string, number> = {
        Osmosis: 100,
        Ethereum: 50,
        Arbitrum: 30,
        Zilliqa: 20,
        Neo: 20,
    };
    return priorities[blockchain] ?? -99; // ✅ Use nullish coalescing
};

// 🎨 Main component
const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    // 🚀 Optimized calculation with single pass
    const processedBalances = useMemo(() => {
        return balances
            .map((balance: WalletBalance) => ({
                ...balance,
                priority: getPriority(balance.blockchain), // ✅ Calculate once
            }))
            .filter((balance) => {
                // ✅ Clear filtering logic
                return balance.priority > -99 && balance.amount > 0;
            })
            .sort((lhs, rhs) => {
                // ✅ Use pre-calculated priority
                return rhs.priority - lhs.priority; // Simplified sort
            })
            .map((balance) => ({
                ...balance,
                formatted: balance.amount.toFixed(2), // ✅ Consistent formatting
                usdValue: (prices[balance.currency] ?? 0) * balance.amount, // ✅ Safe calculation
            }));
    }, [balances, prices]); // ✅ Correct dependencies

    // 🎨 Render optimized rows
    const rows = processedBalances.map((balance: FormattedWalletBalance) => (
        <WalletRow
            key={balance.currency} // ✅ Unique, stable key
            className={classes.row}
            amount={balance.amount}
            usdValue={balance.usdValue}
            formattedAmount={balance.formatted}
        />
    ));

    return <div {...rest}>{rows}</div>;
};

export default WalletPage;
```
