import type { Finish, FinishStyle } from '../../types';

/**
 * Group finishes by their style, respecting order fields
 */
export function getFinishesGroupedByStyle(
  finishes: Finish[],
  styles: FinishStyle[]
): Map<FinishStyle, Finish[]> {
  const grouped = new Map<FinishStyle, Finish[]>();

  // Sort styles by order
  const sortedStyles = [...styles].sort((a, b) => a.order - b.order);

  // Initialize map with sorted styles
  sortedStyles.forEach((style) => {
    grouped.set(style, []);
  });

  // Group finishes by style and sort by order
  finishes.forEach((finish) => {
    const style = sortedStyles.find((s) => s.id === finish.styleId);
    if (style) {
      const finishesInStyle = grouped.get(style) || [];
      finishesInStyle.push(finish);
      grouped.set(style, finishesInStyle);
    }
  });

  // Sort finishes within each style by order
  grouped.forEach((finishesInStyle, style) => {
    finishesInStyle.sort((a, b) => a.order - b.order);
    grouped.set(style, finishesInStyle);
  });

  return grouped;
}

/**
 * Filter to only visible styles for website display
 */
export function getVisibleStyles(styles: FinishStyle[]): FinishStyle[] {
  return styles
    .filter((style) => style.visible)
    .sort((a, b) => a.order - b.order);
}

/**
 * Lookup helper for finding style by ID
 */
export function getStyleById(
  styleId: string,
  styles: FinishStyle[]
): FinishStyle | undefined {
  return styles.find((style) => style.id === styleId);
}

/**
 * Generate unique ID for new finishes
 * Format: prefix + random alphanumeric (e.g., "tn1", "as2", "am3")
 */
export function generateFinishId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 5);
  return `f_${timestamp}${random}`;
}

/**
 * Generate unique ID for new finish styles
 * Format: kebab-case based on name or random
 */
export function generateStyleId(name?: string): string {
  if (name) {
    // Convert name to kebab-case
    const kebab = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return kebab;
  }
  // Fallback to random ID
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 5);
  return `style-${timestamp}${random}`;
}

/**
 * Get finishes by style ID
 */
export function getFinishesByStyleId(
  styleId: string,
  finishes: Finish[]
): Finish[] {
  return finishes
    .filter((finish) => finish.styleId === styleId)
    .sort((a, b) => a.order - b.order);
}

/**
 * Count finishes in each style
 */
export function getStyleFinishCounts(
  finishes: Finish[],
  styles: FinishStyle[]
): Map<string, number> {
  const counts = new Map<string, number>();

  styles.forEach((style) => {
    const count = finishes.filter((f) => f.styleId === style.id).length;
    counts.set(style.id, count);
  });

  return counts;
}

/**
 * Validate that a finish's styleId references an existing style
 */
export function validateFinishStyleId(
  finish: Finish,
  styles: FinishStyle[]
): boolean {
  return styles.some((style) => style.id === finish.styleId);
}

/**
 * Get next order number for a new finish in a style
 */
export function getNextFinishOrder(
  styleId: string,
  finishes: Finish[]
): number {
  const finishesInStyle = finishes.filter((f) => f.styleId === styleId);
  if (finishesInStyle.length === 0) return 1;

  const maxOrder = Math.max(...finishesInStyle.map((f) => f.order));
  return maxOrder + 1;
}

/**
 * Get next order number for a new style
 */
export function getNextStyleOrder(styles: FinishStyle[]): number {
  if (styles.length === 0) return 1;
  const maxOrder = Math.max(...styles.map((s) => s.order));
  return maxOrder + 1;
}
