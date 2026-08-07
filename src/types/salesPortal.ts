/**
 * Sales portal types, re-exported for the front end.
 *
 * `export type` under `verbatimModuleSyntax` is erased at compile time, so this
 * is a compile-time reference only — no `api/_content` code is ever pulled into
 * the client bundle. That matters: the content itself is served per-role from
 * `/api/sales/content` precisely so it never ships to an unauthenticated
 * browser. Import types from here; never import content values from `api/`.
 *
 * Same shape as the existing `src/types/lead.ts` bridge.
 */
export type {
  AnswerKeyEntry,
  AnswerKeySection,
  AnswerStatus,
  BoothContent,
  BoothSlot,
  BulkLane,
  BuyerProfile,
  ChecklistItem,
  ContentLink,
  DimensionRow,
  FollowUpStep,
  KpiTarget,
  LibraryContent,
  LinkKind,
  ManagerContent,
  NeverSayEntry,
  Objection,
  Pitch,
  PitchAudience,
  PortalDoc,
  PortalPayload,
  PortalRole,
  ProductLine,
  QualifyingQuestion,
  RepContent,
  SearchDoc,
  SopStage,
  StrategyContent,
} from '../../api/_content/types.ts';
