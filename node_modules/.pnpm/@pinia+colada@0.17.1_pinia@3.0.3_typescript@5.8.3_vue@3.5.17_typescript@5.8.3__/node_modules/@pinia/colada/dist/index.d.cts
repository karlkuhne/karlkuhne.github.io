import * as vue from 'vue';
import { MaybeRefOrGetter, ShallowRef, EffectScope, ComponentInternalInstance, ComputedRef, Plugin } from 'vue';
import * as pinia from 'pinia';
import { Pinia } from 'pinia';

/**
 * The status of data.
 * - `pending`: initial state
 * - `error`: has an error
 * - `success`: has data
 */
type DataStateStatus = 'pending' | 'error' | 'success';
/**
 * Internal base type for data state.
 * @internal
 */
interface _DataState_Base<TData, TError> {
    /**
     * The last successfully resolved data.
     */
    data: TData;
    /**
     * The last rejected error.
     */
    error: TError;
    /**
     * The status of the data.
     * @see {@link DataStateStatus}
     */
    status: DataStateStatus;
}
interface DataState_Success<TData, TDataInitial> extends _DataState_Base<TData | Exclude<TDataInitial, undefined>, null> {
    status: 'success';
}
interface DataState_Error<TData, TError, TDataInitial> extends _DataState_Base<TData | TDataInitial, TError> {
    status: 'error';
}
interface DataState_Pending<TDataInitial> extends _DataState_Base<TDataInitial, null> {
    status: 'pending';
}
/**
 * Possible states for data based on its status.
 */
type DataState<TData, TError, TDataInitial = undefined> = DataState_Success<TData, TDataInitial> | DataState_Error<TData, TError, TDataInitial> | DataState_Pending<TDataInitial>;
/**
 * The status of an async operation tied to pinia colada e.g. queries and mutations.
 * - `idle`: not loading
 * - `loading`: currently loading
 */
type AsyncStatus = 'idle' | 'loading';

/**
 * Allows you to extend the default types of the library.
 *
 * @example
 * ```ts
 * // types-extension.d.ts
 * import '@pinia/colada'
 * export {}
 * declare module '@pinia/colada' {
 *   interface TypesConfig {
 *     defaultError: MyCustomError
 *   }
 * }
 * ```
 */
interface TypesConfig {
}
/**
 * The default error type used.
 * @internal
 */
type ErrorDefault = TypesConfig extends Record<'defaultError', infer E> ? E : Error;

declare function toCacheKey(key: undefined): undefined;
declare function toCacheKey(key: EntryKey): string;
declare function toCacheKey(key: EntryKey | undefined): string | undefined;
/**
 * Used for keys
 *
 * @internal
 */
type JSONPrimitive = string | number | boolean | null;
/**
 * Used for keys
 *
 * @internal
 */
type JSONValue = JSONPrimitive | JSONObject | JSONArray;
/**
 * Used for keys. Interface to avoid deep recursion.
 *
 * @internal
 */
interface JSONObject {
    readonly [key: string]: JSONValue | undefined;
}
/**
 * Used for keys. Interface to avoid deep recursion.
 *
 * @internal
 */
interface JSONArray extends Array<JSONValue> {
}
/**
 * Key used to identify a query or a mutation. Must be a JSON serializable
 * value. Type is unknwon to avoid deep type recursion.
 */
type EntryKey = readonly JSONValue[];
/**
 * Internal symbol used to tag the data type of the entry key.
 *
 * @internal
 */
declare const ENTRY_DATA_TAG: unique symbol;
/**
 * Internal symbol used to tag the error type of the entry key.
 *
 * @internal
 */
declare const ENTRY_ERROR_TAG: unique symbol;
/**
 * Internal symbol used to tag the data initial type of the entry key.
 *
 * @internal
 */
declare const ENTRY_DATA_INITIAL_TAG: unique symbol;
/**
 * Same as {@link EntryKey} but with a data tag that allows inference of the data type.
 * Used by `defineQueryOptions()`.
 */
type EntryKeyTagged<TData, TError = ErrorDefault, TDataInitial extends TData | undefined = undefined> = EntryKey & {
    [ENTRY_DATA_TAG]: TData;
    [ENTRY_ERROR_TAG]: TError;
    [ENTRY_DATA_INITIAL_TAG]: TDataInitial;
};

/**
 * Possible values for `refetchOnMount`, `refetchOnWindowFocus`, and `refetchOnReconnect`.
 * `true` refetches if data is stale (calles `refresh()`), `false` never refetches, `'always'` always refetches.
 */
type RefetchOnControl = boolean | 'always';
/**
 * Options for queries that can be globally overridden.
 */
interface UseQueryOptionsGlobal {
    /**
     * Whether the query should be enabled or not. If `false`, the query will not
     * be executed until `refetch()` or `refresh()` is called. If it becomes
     * `true`, the query will be refreshed.
     */
    enabled?: MaybeRefOrGetter<boolean>;
    /**
     * Time in ms after which the data is considered stale and will be refreshed
     * on next read.
     *
     * @default 5000 (5 seconds)
     */
    staleTime?: number;
    /**
     * Time in ms after which, once the data is no longer being used, it will be
     * garbage collected to free resources. Set to `false` to disable garbage
     * collection.
     *
     * @default 300_000 (5 minutes)
     */
    gcTime?: number | false;
    /**
     * Whether to refetch the query when the component is mounted.
     * @default true
     */
    refetchOnMount?: MaybeRefOrGetter<RefetchOnControl>;
    /**
     * Whether to refetch the query when the window regains focus.
     * @default true
     */
    refetchOnWindowFocus?: MaybeRefOrGetter<RefetchOnControl>;
    /**
     * Whether to refetch the query when the network reconnects.
     * @default true
     */
    refetchOnReconnect?: MaybeRefOrGetter<RefetchOnControl>;
    /**
     * A placeholder data that is initially shown while the query is loading for
     * the first time. This will also show the `status` as `success` until the
     * query finishes loading (no matter the outcome of the query). Note: unlike
     * with `initialData`, the placeholder does not change the cache state.
     */
    placeholderData?: (previousData: unknown) => any;
}
/**
 * Context object passed to the `query` function of `useQuery()`.
 * @see {@link UseQueryOptions}
 */
interface UseQueryFnContext {
    /**
     * `AbortSignal` instance attached to the query call. If the call becomes
     * outdated (e.g. due to a new call with the same key), the signal will be
     * aborted.
     */
    signal: AbortSignal;
}
/**
 * Options for `useQuery()`. Can be extended by plugins.
 *
 * @example
 * ```ts
 * // use-query-plugin.d.ts
 * export {} // needed
 * declare module '@pinia/colada' {
 *   interface UseQueryOptions {
 *     // Whether to refresh the data when the component is mounted.
 *     refreshOnMount?: boolean
 *   }
 * }
 * ```
 */
interface UseQueryOptions<TData = unknown, TError = ErrorDefault, TDataInitial extends TData | undefined = undefined> extends Pick<UseQueryOptionsGlobal, 'gcTime' | 'enabled' | 'refetchOnMount' | 'refetchOnReconnect' | 'refetchOnWindowFocus' | 'staleTime'> {
    /**
     * The key used to identify the query. Array of primitives **without**
     * reactive values or a reactive array or getter. It should be treaded as an
     * array of dependencies of your queries, e.g. if you use the
     * `route.params.id` property, it should also be part of the key:
     *
     * ```ts
     * import { useRoute } from 'vue-router'
     * import { useQuery } from '@pinia/colada'
     *
     * const route = useRoute()
     * const { data } = useQuery({
     *   // pass a getter function (or computed, ref, etc.) to ensure reactivity
     *   key: () => ['user', route.params.id],
     *   query: () => fetchUser(route.params.id),
     * })
     * ```
     */
    key: MaybeRefOrGetter<EntryKey>;
    /**
     * The function that will be called to fetch the data. It **must** be async.
     */
    query: (context: UseQueryFnContext) => Promise<TData>;
    /**
     * The data which is initially set to the query while the query is loading
     * for the first time. Note: unlike with {@link placeholderData}, setting the
     * initial data changes the state of the query (it will be set to `success`).
     *
     * @see {@link placeholderData}
     */
    initialData?: () => TDataInitial;
    /**
     * A placeholder data that is initially shown while the query is loading for
     * the first time. This will also show the `status` as `success` until the
     * query finishes loading (no matter the outcome of the query). Note: unlike
     * with {@link initialData}, the placeholder does not change the cache state.
     *
     * @see {@link initialData}
     */
    placeholderData?: NoInfer<TDataInitial> | NoInfer<TData> | (<T extends TData>(previousData: T | undefined) => NoInfer<TDataInitial> | NoInfer<TData> | undefined);
}
/**
 * Default options for `useQuery()`. Modifying this object will affect all the queries that don't override these
 */
declare const USE_QUERY_DEFAULTS: {
    staleTime: number;
    gcTime: NonNullable<UseQueryOptions["gcTime"]>;
    refetchOnWindowFocus: NonNullable<UseQueryOptions["refetchOnWindowFocus"]>;
    refetchOnReconnect: NonNullable<UseQueryOptions["refetchOnReconnect"]>;
    refetchOnMount: NonNullable<UseQueryOptions["refetchOnMount"]>;
    enabled: MaybeRefOrGetter<boolean>;
};
type UseQueryOptionsWithDefaults<TData = unknown, TError = ErrorDefault, TDataInitial extends TData | undefined = undefined> = UseQueryOptions<TData, TError, TDataInitial> & typeof USE_QUERY_DEFAULTS;

/**
 * Base interface for {@link EntryFilter}.
 *
 * @internal
 */
interface EntryFilter_Base<TEntry> {
    /**
     * A key to filter the entries.
     */
    key?: EntryKey;
    /**
     * If `true`, it will only match the entry of the given `key`, skipping any children entries.
     * It also makes `key` required.
     *
     * @example
     * ```ts
     * { key: ['a'], exact: true }
     *  // will match ['a'] but not ['a', 'b'], while
     * { key: ['a'] }
     * // will match both
     * ```
     */
    exact?: boolean;
    /**
     * If `true` or `false`, it will only return entries that match the stale status. If set to `null` or `undefined`, it matches both.
     * Requires `entry.options` to be set.
     */
    stale?: boolean | null;
    /**
     * If `true` or `false`, it will only return entries that match the active status. If set to `null` or `undefined`, it matches both.
     */
    active?: boolean | null;
    /**
     * If it has a non _nullish_ value, it only returns the entries with the given status.
     */
    status?: DataStateStatus | null;
    /**
     * Pass a predicate to filter the entries. This will be executed for each entry matching the other filters.
     * @param entry - entry to filter
     */
    predicate?: (entry: TEntry) => boolean;
}
/**
 * Filter to get exactly one entry from the cache. Requires the `key` to be set.
 *
 * @internal
 */
interface EntryFilter_Key<TEntry> extends EntryFilter_Base<TEntry> {
    key: EntryKey;
    exact: true;
}
/**
 * Filter to get multiple matching entries from the cache.
 *
 * @internal
 */
interface EntryFilter_NoKey<TEntry> extends EntryFilter_Base<TEntry> {
    exact?: false;
}
/**
 * Base interface to filter entries from a cache.
 *
 * @internal
 */
type EntryFilter<TEntry> = EntryFilter_NoKey<TEntry> | EntryFilter_Key<TEntry>;

/**
 * Allows defining extensions to the query entry that are returned by `useQuery()`.
 */
interface UseQueryEntryExtensions<TData, TError, TDataInitial extends TData | undefined = undefined> {
}
/**
 * NOTE: Entries could be classes but the point of having all functions within the store is to allow plugins to hook
 * into actions.
 */
/**
 * A query entry in the cache.
 */
interface UseQueryEntry<TData = unknown, TError = unknown, TDataInitial extends TData | undefined = unknown extends TData ? unknown : undefined> {
    /**
     * The state of the query. Contains the data, error and status.
     */
    state: ShallowRef<DataState<TData, TError, TDataInitial>>;
    /**
     * A placeholder `data` that is initially shown while the query is loading for the first time. This will also show the
     * `status` as `success` until the query finishes loading (no matter the outcome).
     */
    placeholderData: TDataInitial | TData | null | undefined;
    /**
     * The status of the query.
     */
    asyncStatus: ShallowRef<AsyncStatus>;
    /**
     * When was this data set in the entry for the last time in ms. It can also
     * be 0 if the entry has been invalidated.
     */
    when: number;
    /**
     * The serialized key associated with this query entry.
     */
    key: EntryKey;
    /**
     * Seriaized version of the key. Used to retrieve the entry from the cache.
     */
    keyHash: string;
    /**
     * Components and effects scopes that use this query entry.
     */
    deps: Set<EffectScope | ComponentInternalInstance>;
    /**
     * Timeout id that scheduled a garbage collection. It is set here to clear it when the entry is used by a different component
     */
    gcTimeout: ReturnType<typeof setTimeout> | undefined;
    /**
     * The current pending request.
     */
    pending: null | {
        /**
         * The abort controller used to cancel the request and which `signal` is passed to the query function.
         */
        abortController: AbortController;
        /**
         * The promise created by `queryCache.fetch` that is currently pending.
         */
        refreshCall: Promise<DataState<TData, TError, TDataInitial>>;
        /**
         * When was this `pending` object created.
         */
        when: number;
    };
    /**
     * Options used to create the query. They can be `null` during hydration but are needed for fetching. This is why
     * `store.ensure()` sets this property. Note these options might be shared by multiple query entries when the key is
     * dynamic and that's why some methods like {@link fetch} receive the options as an argument.
     */
    options: UseQueryOptionsWithDefaults<TData, TError, TDataInitial> | null;
    /**
     * Whether the data is stale or not, requires `options.staleTime` to be set.
     */
    readonly stale: boolean;
    /**
     * Whether the query is currently being used by a Component or EffectScope (e.g. a store).
     */
    readonly active: boolean;
    /**
     * Extensions to the query entry added by plugins.
     */
    ext: UseQueryEntryExtensions<TData, TError, TDataInitial>;
    /**
     * Internal property to store the HMR ids of the components that are using
     * this query and force refetching.
     *
     * @internal
     */
    __hmr?: {
        /**
         * Reference count of the components using this query.
         */
        ids: Map<string, number>;
    };
}
/**
 * Filter object to get entries from the query cache.
 *
 * @see {@link QueryCache.getEntries}
 * @see {@link QueryCache.cancelQueries}
 * @see {@link QueryCache#invalidateQueries}
 */
type UseQueryEntryFilter = EntryFilter<UseQueryEntry>;
/**
 * A query entry that is defined with {@link defineQuery}.
 * @internal
 */
type DefineQueryEntry = [
    lastEnsuredEntries: UseQueryEntry[],
    returnValue: unknown,
    effect: EffectScope,
    paused: ShallowRef<boolean>
];
/**
 * Composable to get the cache of the queries. As any other composable, it can be used inside the `setup` function of a
 * component, within another composable, or in injectable contexts like stores and navigation guards.
 */
declare const useQueryCache: pinia.StoreDefinition<"_pc_query", Pick<{
    caches: vue.Ref<Map<string, UseQueryEntry<unknown, unknown, unknown>>, Map<string, UseQueryEntry<unknown, unknown, unknown>>>;
    ensureDefinedQuery: <T>(fn: () => T) => DefineQueryEntry;
    /**
     * Scope to track effects and components that use the query cache.
     * @internal
     */
    _s: vue.Raw<EffectScope>;
    setQueryData: <TData = unknown, TError = Error, TDataInitial extends TData | undefined = undefined>(key: EntryKeyTagged<TData, TError, TDataInitial> | EntryKey, data: NoInfer<TData> | Exclude<NoInfer<TDataInitial>, undefined> | ((oldData: TData | TDataInitial | undefined) => TData | Exclude<TDataInitial, undefined>)) => void;
    setQueriesData: <TData = unknown>(filters: UseQueryEntryFilter, updater: (previous: TData | undefined) => TData) => void;
    getQueryData: <TData = unknown, TError = Error, TDataInitial extends TData | undefined = undefined>(key: EntryKeyTagged<TData, TError, TDataInitial> | EntryKey) => TData | TDataInitial | undefined;
    invalidateQueries: (filters?: UseQueryEntryFilter, refetchActive?: boolean | "all") => Promise<unknown>;
    cancelQueries: (filters?: UseQueryEntryFilter, reason?: unknown) => void;
    invalidate: (entry: UseQueryEntry) => void;
    fetch: <TData, TError, TDataInitial extends TData | undefined>(entry: UseQueryEntry<TData, TError, TDataInitial>, options?: UseQueryOptionsWithDefaults<TData, TError, TDataInitial>) => Promise<DataState<TData, TError, TDataInitial>>;
    refresh: <TData, TError, TDataInitial extends TData | undefined>(entry: UseQueryEntry<TData, TError, TDataInitial>, options?: UseQueryOptionsWithDefaults<TData, TError, TDataInitial>) => Promise<DataState<TData, TError, TDataInitial>>;
    ensure: <TData = unknown, TError = Error, TDataInitial extends TData | undefined = undefined>(opts: UseQueryOptions<TData, TError, TDataInitial>, previousEntry?: UseQueryEntry<TData, TError, TDataInitial>) => UseQueryEntry<TData, TError, TDataInitial>;
    extend: <TData = unknown, TError = Error, TDataInitial extends TData | undefined = undefined>(_entry: UseQueryEntry<TData, TError, TDataInitial>) => void;
    track: (entry: UseQueryEntry, effect: EffectScope | ComponentInternalInstance | null | undefined) => void;
    untrack: (entry: UseQueryEntry, effect: EffectScope | ComponentInternalInstance | undefined | null) => void;
    cancel: (entry: UseQueryEntry, reason?: unknown) => void;
    create: <TData, TError, TDataInitial extends TData | undefined>(key: EntryKey, options?: UseQueryOptionsWithDefaults<TData, TError, TDataInitial> | null, initialData?: TDataInitial, error?: TError | null, when?: number) => UseQueryEntry<TData, TError, TDataInitial>;
    remove: (entry: UseQueryEntry) => void;
    get: <TData = unknown, TError = Error, TDataInitial extends TData | undefined = undefined>(key: EntryKeyTagged<TData, TError, TDataInitial> | EntryKey) => UseQueryEntry<TData, TError, TDataInitial> | undefined;
    setEntryState: <TData, TError, TDataInitial extends TData | undefined = TData>(entry: UseQueryEntry<TData, TError, TDataInitial>, state: DataState<NoInfer<TData>, NoInfer<TError>, NoInfer<TDataInitial>>) => void;
    getEntries: (filters?: UseQueryEntryFilter) => UseQueryEntry[];
}, "caches" | "_s">, Pick<{
    caches: vue.Ref<Map<string, UseQueryEntry<unknown, unknown, unknown>>, Map<string, UseQueryEntry<unknown, unknown, unknown>>>;
    ensureDefinedQuery: <T>(fn: () => T) => DefineQueryEntry;
    /**
     * Scope to track effects and components that use the query cache.
     * @internal
     */
    _s: vue.Raw<EffectScope>;
    setQueryData: <TData = unknown, TError = Error, TDataInitial extends TData | undefined = undefined>(key: EntryKeyTagged<TData, TError, TDataInitial> | EntryKey, data: NoInfer<TData> | Exclude<NoInfer<TDataInitial>, undefined> | ((oldData: TData | TDataInitial | undefined) => TData | Exclude<TDataInitial, undefined>)) => void;
    setQueriesData: <TData = unknown>(filters: UseQueryEntryFilter, updater: (previous: TData | undefined) => TData) => void;
    getQueryData: <TData = unknown, TError = Error, TDataInitial extends TData | undefined = undefined>(key: EntryKeyTagged<TData, TError, TDataInitial> | EntryKey) => TData | TDataInitial | undefined;
    invalidateQueries: (filters?: UseQueryEntryFilter, refetchActive?: boolean | "all") => Promise<unknown>;
    cancelQueries: (filters?: UseQueryEntryFilter, reason?: unknown) => void;
    invalidate: (entry: UseQueryEntry) => void;
    fetch: <TData, TError, TDataInitial extends TData | undefined>(entry: UseQueryEntry<TData, TError, TDataInitial>, options?: UseQueryOptionsWithDefaults<TData, TError, TDataInitial>) => Promise<DataState<TData, TError, TDataInitial>>;
    refresh: <TData, TError, TDataInitial extends TData | undefined>(entry: UseQueryEntry<TData, TError, TDataInitial>, options?: UseQueryOptionsWithDefaults<TData, TError, TDataInitial>) => Promise<DataState<TData, TError, TDataInitial>>;
    ensure: <TData = unknown, TError = Error, TDataInitial extends TData | undefined = undefined>(opts: UseQueryOptions<TData, TError, TDataInitial>, previousEntry?: UseQueryEntry<TData, TError, TDataInitial>) => UseQueryEntry<TData, TError, TDataInitial>;
    extend: <TData = unknown, TError = Error, TDataInitial extends TData | undefined = undefined>(_entry: UseQueryEntry<TData, TError, TDataInitial>) => void;
    track: (entry: UseQueryEntry, effect: EffectScope | ComponentInternalInstance | null | undefined) => void;
    untrack: (entry: UseQueryEntry, effect: EffectScope | ComponentInternalInstance | undefined | null) => void;
    cancel: (entry: UseQueryEntry, reason?: unknown) => void;
    create: <TData, TError, TDataInitial extends TData | undefined>(key: EntryKey, options?: UseQueryOptionsWithDefaults<TData, TError, TDataInitial> | null, initialData?: TDataInitial, error?: TError | null, when?: number) => UseQueryEntry<TData, TError, TDataInitial>;
    remove: (entry: UseQueryEntry) => void;
    get: <TData = unknown, TError = Error, TDataInitial extends TData | undefined = undefined>(key: EntryKeyTagged<TData, TError, TDataInitial> | EntryKey) => UseQueryEntry<TData, TError, TDataInitial> | undefined;
    setEntryState: <TData, TError, TDataInitial extends TData | undefined = TData>(entry: UseQueryEntry<TData, TError, TDataInitial>, state: DataState<NoInfer<TData>, NoInfer<TError>, NoInfer<TDataInitial>>) => void;
    getEntries: (filters?: UseQueryEntryFilter) => UseQueryEntry[];
}, never>, Pick<{
    caches: vue.Ref<Map<string, UseQueryEntry<unknown, unknown, unknown>>, Map<string, UseQueryEntry<unknown, unknown, unknown>>>;
    ensureDefinedQuery: <T>(fn: () => T) => DefineQueryEntry;
    /**
     * Scope to track effects and components that use the query cache.
     * @internal
     */
    _s: vue.Raw<EffectScope>;
    setQueryData: <TData = unknown, TError = Error, TDataInitial extends TData | undefined = undefined>(key: EntryKeyTagged<TData, TError, TDataInitial> | EntryKey, data: NoInfer<TData> | Exclude<NoInfer<TDataInitial>, undefined> | ((oldData: TData | TDataInitial | undefined) => TData | Exclude<TDataInitial, undefined>)) => void;
    setQueriesData: <TData = unknown>(filters: UseQueryEntryFilter, updater: (previous: TData | undefined) => TData) => void;
    getQueryData: <TData = unknown, TError = Error, TDataInitial extends TData | undefined = undefined>(key: EntryKeyTagged<TData, TError, TDataInitial> | EntryKey) => TData | TDataInitial | undefined;
    invalidateQueries: (filters?: UseQueryEntryFilter, refetchActive?: boolean | "all") => Promise<unknown>;
    cancelQueries: (filters?: UseQueryEntryFilter, reason?: unknown) => void;
    invalidate: (entry: UseQueryEntry) => void;
    fetch: <TData, TError, TDataInitial extends TData | undefined>(entry: UseQueryEntry<TData, TError, TDataInitial>, options?: UseQueryOptionsWithDefaults<TData, TError, TDataInitial>) => Promise<DataState<TData, TError, TDataInitial>>;
    refresh: <TData, TError, TDataInitial extends TData | undefined>(entry: UseQueryEntry<TData, TError, TDataInitial>, options?: UseQueryOptionsWithDefaults<TData, TError, TDataInitial>) => Promise<DataState<TData, TError, TDataInitial>>;
    ensure: <TData = unknown, TError = Error, TDataInitial extends TData | undefined = undefined>(opts: UseQueryOptions<TData, TError, TDataInitial>, previousEntry?: UseQueryEntry<TData, TError, TDataInitial>) => UseQueryEntry<TData, TError, TDataInitial>;
    extend: <TData = unknown, TError = Error, TDataInitial extends TData | undefined = undefined>(_entry: UseQueryEntry<TData, TError, TDataInitial>) => void;
    track: (entry: UseQueryEntry, effect: EffectScope | ComponentInternalInstance | null | undefined) => void;
    untrack: (entry: UseQueryEntry, effect: EffectScope | ComponentInternalInstance | undefined | null) => void;
    cancel: (entry: UseQueryEntry, reason?: unknown) => void;
    create: <TData, TError, TDataInitial extends TData | undefined>(key: EntryKey, options?: UseQueryOptionsWithDefaults<TData, TError, TDataInitial> | null, initialData?: TDataInitial, error?: TError | null, when?: number) => UseQueryEntry<TData, TError, TDataInitial>;
    remove: (entry: UseQueryEntry) => void;
    get: <TData = unknown, TError = Error, TDataInitial extends TData | undefined = undefined>(key: EntryKeyTagged<TData, TError, TDataInitial> | EntryKey) => UseQueryEntry<TData, TError, TDataInitial> | undefined;
    setEntryState: <TData, TError, TDataInitial extends TData | undefined = TData>(entry: UseQueryEntry<TData, TError, TDataInitial>, state: DataState<NoInfer<TData>, NoInfer<TError>, NoInfer<TDataInitial>>) => void;
    getEntries: (filters?: UseQueryEntryFilter) => UseQueryEntry[];
}, "cancel" | "get" | "ensureDefinedQuery" | "setQueryData" | "setQueriesData" | "getQueryData" | "invalidateQueries" | "cancelQueries" | "invalidate" | "fetch" | "refresh" | "ensure" | "extend" | "track" | "untrack" | "create" | "remove" | "setEntryState" | "getEntries">>;
/**
 * The cache of the queries. It's the store returned by {@link useQueryCache}.
 */
type QueryCache = ReturnType<typeof useQueryCache>;
/**
 * Checks if the given object is a query cache. Used in SSR to apply custom serialization.
 *
 * @param cache - the object to check
 *
 * @see {@link QueryCache}
 * @see {@link serializeQueryCache}
 */
declare function isQueryCache(cache: unknown): cache is QueryCache;
/**
 * Raw data of a query entry. Can be serialized from the server and used to
 * hydrate the store.
 *
 * @internal
 */
type _UseQueryEntryNodeValueSerialized<TData = unknown, TError = unknown> = [
    /**
     * The data returned by the query.
     */
    data: TData | undefined,
    /**
     * The error thrown by the query.
     */
    error: TError | null,
    /**
     * When was this data fetched the last time in ms
     */
    when?: number
];
/**
 * Hydrates the query cache with the serialized cache. Used during SSR.
 * @param queryCache - query cache
 * @param serializedCache - serialized cache
 */
declare function hydrateQueryCache(queryCache: QueryCache, serializedCache: Record<string, _UseQueryEntryNodeValueSerialized>): void;
/**
 * Serializes the query cache to a compressed version. Used during SSR.
 *
 * @param queryCache - query cache
 */
declare function serializeQueryCache(queryCache: QueryCache): Record<string, _UseQueryEntryNodeValueSerialized>;

/**
 * Return type of `useQuery()`.
 */
interface UseQueryReturn<TData = unknown, TError = ErrorDefault, TDataInitial extends TData | undefined = undefined> extends UseQueryEntryExtensions<TData, TError, TDataInitial> {
    /**
     * The state of the query. Contains its data, error, and status.
     */
    state: ComputedRef<DataState<TData, TError, TDataInitial>>;
    /**
     * Status of the query. Becomes `'loading'` while the query is being fetched, is `'idle'` otherwise.
     */
    asyncStatus: ComputedRef<AsyncStatus>;
    /**
     * The last successful data resolved by the query. Alias for `state.value.data`.
     *
     * @see {@link state}
     */
    data: ShallowRef<TData | TDataInitial>;
    /**
     * The error rejected by the query. Alias for `state.value.error`.
     *
     * @see {@link state}
     */
    error: ShallowRef<TError | null>;
    /**
     * The status of the query. Alias for `state.value.status`.
     *
     * @see {@link state}
     * @see {@link DataStateStatus}
     */
    status: ShallowRef<DataStateStatus>;
    /**
     * Returns whether the request is still pending its first call. Alias for `status.value === 'pending'`
     */
    isPending: ComputedRef<boolean>;
    /**
     * Returns whether the `data` is the `placeholderData`.
     */
    isPlaceholderData: ComputedRef<boolean>;
    /**
     * Returns whether the request is currently fetching data. Alias for `asyncStatus.value === 'loading'`
     */
    isLoading: ShallowRef<boolean>;
    /**
     * Ensures the current data is fresh. If the data is stale, refetch, if not return as is.
     * @param throwOnError - whether to throw an error if the refresh fails. Defaults to `false`
     * @returns a promise that resolves when the refresh is done
     */
    refresh: (throwOnError?: boolean) => Promise<DataState<TData, TError, TDataInitial>>;
    /**
     * Ignores fresh data and triggers a new fetch
     * @param throwOnError - whether to throw an error if the fetch fails. Defaults to `false`
     * @returns a promise that resolves when the fetch is done
     */
    refetch: (throwOnError?: boolean) => Promise<DataState<TData, TError, TDataInitial>>;
}
/**
 * Ensures and return a shared query state based on the `key` option.
 *
 * @param options - The options of the query
 *
 * @example
 * ```ts
 * const { state } = useQuery({
 *   key: ['documents'],
 *   query: () => getDocuments(),
 * })
 * ```
 */
declare function useQuery<TData, TError = ErrorDefault, TDataInitial extends TData | undefined = undefined>(options: UseQueryOptions<TData, TError, TDataInitial> | (() => DefineQueryOptions<TData, TError, TDataInitial>)): UseQueryReturn<TData, TError, TDataInitial>;
/**
 * `useQuery` for dynamic typed query keys. Requires options defined with
 * {@link defineQueryOptions}.
 *
 * @param setupOptions - options defined with {@link defineQueryOptions}
 * @param paramsGetter - a getter or ref that returns the parameters for the `setupOptions`
 *
 * @example
 * ```ts
 * import { defineQueryOptions, useQuery } from '@pinia/colada'
 *
 * const documentDetailsQuery = defineQueryOptions((id: number ) => ({
 *   key: ['documents', id],
 *   query: () => fetchDocument(id),
 * }))
 *
 * useQuery(documentDetailsQuery, 4)
 * useQuery(documentDetailsQuery, () => route.params.id)
 * useQuery(documentDetailsQuery, () => props.id)
 * ```
 */
declare function useQuery<Params, TData, TError, TDataInitial extends TData | undefined>(setupOptions: (params: Params) => DefineQueryOptions<TData, TError, TDataInitial>, paramsGetter: MaybeRefOrGetter<NoInfer<Params>>): UseQueryReturn<TData, TError, TDataInitial>;

/**
 * Type that represents a value that can be an array or a single value.
 *
 * @internal
 */
type _MaybeArray<T> = T | T[];
/**
 * Checks if a type is exactly `any`.
 *
 * @internal
 */
type IsAny<T> = 0 extends 1 & T ? true : false;
/**
 * Checks if a type is exactly `unknown`. This is useful to determine if a type is
 *
 * @internal
 */
type IsUnknown<T> = IsAny<T> extends true ? false : unknown extends T ? true : false;
/**
 * Type that represents a value that can be a promise or a single value.
 *
 * @internal
 */
type _Awaitable<T> = T | Promise<T>;
/**
 * To avoid using `{}`
 * @internal
 */
interface _EmptyObject {
}
/**
 * @internal
 */
type _IsMaybeRefOrGetter<T> = [T] extends [MaybeRefOrGetter<infer U>] ? MaybeRefOrGetter<U> extends T ? true : false : false;
/**
 * @internal
 */
type _UnwrapMaybeRefOrGetter<T> = T extends MaybeRefOrGetter<infer U> ? U : T;
/**
 * Removes the `MaybeRefOrGetter` wrapper from all fields of an object.
 * @internal
 */
type _RemoveMaybeRef<T> = {
    [K in keyof T]: _IsMaybeRefOrGetter<NonNullable<T[K]>> extends true ? _UnwrapMaybeRefOrGetter<T[K]> : T[K];
};

/**
 * Options to define a query with `defineQuery()`. Similar to
 * {@link UseQueryOptions} but disallows reactive values as `defineQuery()` is
 * used outside of an effect scope.
 */
type DefineQueryOptions<TData = unknown, TError = ErrorDefault, TDataInitial extends TData | undefined = undefined> = _RemoveMaybeRef<UseQueryOptions<TData, TError, TDataInitial>> & {
    initialData?: () => TDataInitial;
    placeholderData?: NoInfer<TDataInitial> | NoInfer<TData> | (<T extends TData>(previousData: T | undefined) => NoInfer<TDataInitial> | NoInfer<TData> | undefined);
};
/**
 * Define a query with the given options. Similar to `useQuery(options)` but
 * allows you to reuse **all** of the query state in multiple places. It only
 * allow static values in options. If you need dynamic values, use the function
 * version.
 *
 * @param options - the options to define the query
 *
 * @example
 * ```ts
 * const useTodoList = defineQuery({
 *   key: ['todos'],
 *   query: () => fetch('/api/todos', { method: 'GET' }),
 * })
 * ```
 */
declare function defineQuery<TData, TError = ErrorDefault>(options: DefineQueryOptions<TData, TError>): () => UseQueryReturn<TData, TError>;
/**
 * Define a query with a setup function. Allows to return arbitrary values from
 * the query function, create contextual refs, rename the returned values, etc.
 * The setup function will be called only once, like stores, and **must be
 * synchronous**.
 *
 * @param setup - a function to setup the query
 *
 * @example
 * ```ts
 * const useFilteredTodos = defineQuery(() => {
 *   const todoFilter = ref<'all' | 'finished' | 'unfinished'>('all')
 *   const { data, ...rest } = useQuery({
 *    key: ['todos', { filter: todoFilter.value }],
 *     query: () =>
 *       fetch(`/api/todos?filter=${todoFilter.value}`, { method: 'GET' }),
 *   })
 *   // expose the todoFilter ref and rename data for convenience
 *   return { ...rest, todoList: data, todoFilter }
 * })
 * ```
 */
declare function defineQuery<T>(setup: () => T): () => T;

/**
 * Tagged version of {@link DefineQueryOptions} that includes a key with
 * data type information.
 */
interface DefineQueryOptionsTagged<TData = unknown, TError = ErrorDefault, TDataInitial extends TData | undefined = undefined> extends DefineQueryOptions<TData, TError, TDataInitial> {
    key: EntryKeyTagged<TData, TError, TDataInitial>;
}
/**
 * Define dynamic query options by passing a function that accepts an arbitrary
 * parameter and returns the query options. Enables type-safe query keys.
 * Must be passed to {@link useQuery} alongside a getter for the params.
 *
 * @param setupOptions - A function that returns the query options.
 */
declare function defineQueryOptions<Params, TData, TError = ErrorDefault, TDataInitial extends TData | undefined = undefined>(setupOptions: (params: Params) => DefineQueryOptions<TData, TError, TDataInitial>): (params: Params) => DefineQueryOptionsTagged<TData, TError, TDataInitial>;
/**
 * Define static query options that are type safe with
 * `queryCache.getQueryData()`. Can be passed directly to {@link useQuery}.
 *
 * @param options - The query options.
 */
declare function defineQueryOptions<TData, TError = ErrorDefault, TDataInitial extends TData | undefined = undefined>(options: DefineQueryOptions<TData, TError, TDataInitial>): DefineQueryOptionsTagged<TData, TError, TDataInitial>;

/**
 * Return type for the {@link useQueryState} composable.
 *
 * @see {@link useQueryState}
 */
interface UseQueryStateReturn<TData = unknown, TError = ErrorDefault, TDataInitial extends TData | undefined = undefined> {
    /**
     * `state` of the query entry.
     *
     * @see {@link UseQueryReturn#state}
     */
    state: ComputedRef<DataState<TData, TError, TDataInitial> | undefined>;
    /**
     * `data` of the query entry.
     *
     * @see {@link UseQueryReturn#data}
     */
    data: ComputedRef<TData | TDataInitial | undefined>;
    /**
     * `error` of the query entry.
     *
     * @see {@link UseQueryReturn#error}
     */
    error: ComputedRef<TError | null | undefined>;
    /**
     * `status` of the query entry.
     *
     * @see {@link DataStateStatus}
     * @see {@link UseQueryReturn#status}
     */
    status: ComputedRef<DataStateStatus | undefined>;
    /**
     * `asyncStatus` of the query entry.
     *
     * @see {@link AsyncStatus}
     * @see {@link UseQueryReturn#asyncStatus}
     */
    asyncStatus: ComputedRef<AsyncStatus | undefined>;
    /**
     * Is the query entry currently pending or non existent.
     */
    isPending: ComputedRef<boolean>;
}
/**
 * Reactive access to the state of a query entry without fetching it.
 *
 * @param key - tagged key of the query entry to access
 */
declare function useQueryState<TData, TError = ErrorDefault, TDataInitial extends TData | undefined = undefined>(key: MaybeRefOrGetter<EntryKeyTagged<TData, TError, TDataInitial>>): UseQueryStateReturn<TData, TError, TDataInitial>;
/**
 * Reactive access to the state of a query entry without fetching it.
 *
 * @param setupOptions - function that returns the query options based on the provided params
 * @param paramsGetter - getter for the parameters used to generate the query key
 *
 * @see {@link DefineQueryOptions}
 * @see {@link defineQueryOptions}
 */
declare function useQueryState<Params, TData, TError, TDataInitial extends TData | undefined>(setupOptions: (params: Params) => DefineQueryOptions<TData, TError, TDataInitial>, paramsGetter: MaybeRefOrGetter<NoInfer<Params>>): UseQueryStateReturn<TData, TError, TDataInitial>;
/**
 * Reactive access to the state of a query entry without fetching it.
 *
 * @param key - key of the query entry to access
 */
declare function useQueryState<TData, TError = ErrorDefault, TDataInitial extends TData | undefined = undefined>(key: MaybeRefOrGetter<EntryKey>): UseQueryStateReturn<TData, TError, TDataInitial>;

/**
 * Options for {@link useInfiniteQuery}.
 *
 * @experimental See https://github.com/posva/pinia-colada/issues/178
 */
interface UseInfiniteQueryOptions<TData, TError, TDataInitial extends TData | undefined = TData | undefined, TPages = unknown> extends Omit<UseQueryOptions<TData, TError, TDataInitial>, 'query' | 'initialData' | 'placeholderData' | 'key'> {
    key: UseQueryOptions<TPages, TError, TPages>['key'];
    /**
     * The function that will be called to fetch the data. It **must** be async.
     */
    query: (pages: NoInfer<TPages>, context: UseQueryFnContext) => Promise<TData>;
    initialPage: TPages | (() => TPages);
    merge: (result: NoInfer<TPages>, current: NoInfer<TData>) => NoInfer<TPages>;
}
interface UseInfiniteQueryReturn<TPage = unknown, TError = ErrorDefault> extends Omit<UseQueryReturn<TPage, TError, TPage>, 'refetch' | 'refresh'> {
    loadMore: () => Promise<unknown>;
}
/**
 * Store and merge paginated data into a single cache entry. Allows to handle
 * infinite scrolling. This is an **experimental** API and is subject to
 * change.
 *
 * @param options - Options to configure the infinite query.
 *
 * @experimental See https://github.com/posva/pinia-colada/issues/178
 */
declare function useInfiniteQuery<TData, TError = ErrorDefault, TPage = unknown>(options: UseInfiniteQueryOptions<TData, TError, TData | undefined, TPage>): UseInfiniteQueryReturn<TPage, TError>;

/**
 * Valid keys for a mutation. Similar to query keys.
 *
 * @see {@link EntryKey}
 *
 * @internal
 */
type _MutationKey<TVars> = EntryKey | ((vars: TVars) => EntryKey);
/**
 * Removes the nullish types from the context type to make `A & TContext` work instead of yield `never`.
 *
 * @internal
 */
type _ReduceContext<TContext> = TContext extends void | null | undefined ? _EmptyObject : Record<any, any> extends TContext ? _EmptyObject : TContext;
/**
 * Context object returned by a global `onMutate` function that is merged with the context returned by a local
 * `onMutate`.
 * @example
 * ```ts
 * declare module '@pinia/colada' {
 *   export interface UseMutationGlobalContext {
 *     router: Router // from vue-router
 *   }
 * }
 *
 * // add the `router` to the context
 * app.use(MutationPlugin, {
 *   onMutate() {
 *     return { router }
 *   },
 * })
 * ```
 */
interface UseMutationGlobalContext {
}
interface UseMutationReturn<TData, TVars, TError> {
    key?: EntryKey | ((vars: NoInfer<TVars>) => EntryKey);
    /**
     * The combined state of the mutation. Contains its data, error, and status.
     * It enables type narrowing based on the {@link UseMutationReturn['status']}.
     */
    state: ComputedRef<DataState<TData, TError>>;
    /**
     * The status of the mutation.
     *
     * @see {@link DataStateStatus}
     */
    status: ShallowRef<DataStateStatus>;
    /**
     * Status of the mutation. Becomes `'loading'` while the mutation is being fetched, is `'idle'` otherwise.
     */
    asyncStatus: ShallowRef<AsyncStatus>;
    /**
     * The result of the mutation. `undefined` if the mutation has not been called yet.
     */
    data: ShallowRef<TData | undefined>;
    /**
     * The error of the mutation. `null` if the mutation has not been called yet or if it was successful.
     */
    error: ShallowRef<TError | null>;
    /**
     * Whether the mutation is currently executing.
     */
    isLoading: ComputedRef<boolean>;
    /**
     * The variables passed to the mutation. They are initially `undefined` and change every time the mutation is called.
     */
    variables: ShallowRef<TVars | undefined>;
    /**
     * Calls the mutation and returns a promise with the result.
     *
     * @param vars - parameters to pass to the mutation
     */
    mutateAsync: unknown | void extends TVars ? () => Promise<TData> : (vars: TVars) => Promise<TData>;
    /**
     * Calls the mutation without returning a promise to avoid unhandled promise rejections.
     *
     * @param args - parameters to pass to the mutation
     */
    mutate: (...args: unknown | void extends TVars ? [] : [vars: TVars]) => void;
    /**
     * Resets the state of the mutation to its initial state.
     */
    reset: () => void;
}
/**
 * Setups a mutation.
 *
 * @param options - Options to create the mutation
 *
 * @example
 * ```ts
 * const queryCache = useQueryCache()
 * const { mutate, status, error } = useMutation({
 *   mutation: (id: number) => fetch(`/api/todos/${id}`),
 *   onSuccess() {
 *     queryCache.invalidateQueries('todos')
 *   },
 * })
 * ```
 */
declare function useMutation<TData, TVars = void, TError = ErrorDefault, TContext extends Record<any, any> = _EmptyObject>(options: UseMutationOptions<TData, TVars, TError, TContext>): UseMutationReturn<TData, TVars, TError>;

/**
 * Options for mutations that can be globally overridden.
 */
interface UseMutationOptionsGlobal {
    /**
     * Runs before a mutation is executed. It can return a value that will be
     * passed to `mutation`, `onSuccess`, `onError` and `onSettled`. If it
     * returns a promise, it will be awaited before running `mutation`.
     */
    onMutate?: (
    /**
     * The variables passed to the mutation.
     */
    vars: unknown) => _Awaitable<UseMutationGlobalContext | undefined | void | null>;
    /**
     * Runs when a mutation is successful.
     */
    onSuccess?: (
    /**
     * The result of the mutation.
     */
    data: unknown, 
    /**
     * The variables passed to the mutation.
     */
    vars: unknown, 
    /**
     * The merged context from `onMutate` and the global context.
     */
    context: UseMutationGlobalContext) => unknown;
    /**
     * Runs when a mutation encounters an error.
     */
    onError?: (
    /**
     * The error thrown by the mutation.
     */
    error: unknown, 
    /**
     * The variables passed to the mutation.
     */
    vars: unknown, 
    /**
     * The merged context from `onMutate` and the global context. Properties returned by `onMutate` can be `undefined`
     * if `onMutate` throws.
     */
    context: Partial<Record<keyof UseMutationGlobalContext, never>> | UseMutationGlobalContext) => unknown;
    /**
     * Runs after the mutation is settled, regardless of the result.
     */
    onSettled?: (
    /**
     * The result of the mutation. `undefined` when a mutation failed.
     */
    data: unknown | undefined, 
    /**
     * The error thrown by the mutation. `undefined` if the mutation was successful.
     */
    error: unknown | undefined, 
    /**
     * The variables passed to the mutation.
     */
    vars: unknown, 
    /**
     * The merged context from `onMutate` and the global context. Properties returned by `onMutate` can be `undefined`
     * if `onMutate` throws.
     */
    context: Partial<Record<keyof UseMutationGlobalContext, never>> | UseMutationGlobalContext) => unknown;
    /**
     * Time in ms after which, once the mutation is no longer being used, it will be
     * garbage collected to free resources. Set to `false` to disable garbage
     * collection (not recommended).
     *
     * @default 60_000 (1 minute)
     */
    gcTime?: number | false;
}
/**
 * Default options for `useMutation()`. Modifying this object will affect all mutations.
 */
declare const USE_MUTATION_DEFAULTS: {
    gcTime: NonNullable<UseMutationOptions["gcTime"]>;
};
/**
 * Options to create a mutation.
 */
interface UseMutationOptions<TData = unknown, TVars = void, TError = ErrorDefault, TContext extends Record<any, any> = _EmptyObject> extends Pick<UseMutationOptionsGlobal, 'gcTime'> {
    /**
     * The key of the mutation. If the mutation is successful, it will invalidate the mutation with the same key and refetch it
     */
    mutation: (vars: TVars, context: _ReduceContext<NoInfer<TContext>>) => Promise<TData>;
    /**
     * Optional key to identify the mutation globally and access it through other
     * helpers like `useMutationState()`. If you don't need to reference the
     * mutation elsewhere, you should ignore this option.
     */
    key?: _MutationKey<NoInfer<TVars>>;
    /**
     * Runs before the mutation is executed. **It should be placed before `mutation()` for `context` to be inferred**. It
     * can return a value that will be passed to `mutation`, `onSuccess`, `onError` and `onSettled`. If it returns a
     * promise, it will be awaited before running `mutation`.
     *
     * @example
     * ```ts
     * useMutation({
     * // must appear before `mutation` for `{ foo: string }` to be inferred
     * // within `mutation`
     *   onMutate() {
     *     return { foo: 'bar' }
     *   },
     *   mutation: (id: number, { foo }) => {
     *     console.log(foo) // bar
     *     return fetch(`/api/todos/${id}`)
     *   },
     *   onSuccess(context) {
     *     console.log(context.foo) // bar
     *   },
     * })
     * ```
     */
    onMutate?: (
    /**
     * The variables passed to the mutation.
     */
    vars: NoInfer<TVars>, context: UseMutationGlobalContext) => _Awaitable<TContext | undefined | void | null>;
    /**
     * Runs if the mutation is successful.
     */
    onSuccess?: (
    /**
     * The result of the mutation.
     */
    data: NoInfer<TData>, 
    /**
     * The variables passed to the mutation.
     */
    vars: NoInfer<TVars>, 
    /**
     * The merged context from `onMutate` and the global context.
     */
    context: UseMutationGlobalContext & _ReduceContext<NoInfer<TContext>>) => unknown;
    /**
     * Runs if the mutation encounters an error.
     */
    onError?: (
    /**
     * The error thrown by the mutation.
     */
    error: TError, 
    /**
     * The variables passed to the mutation.
     */
    vars: NoInfer<TVars>, 
    /**
     * The merged context from `onMutate` and the global context. Properties returned by `onMutate` can be `undefined`
     * if `onMutate` throws.
     */
    context: (Partial<Record<keyof UseMutationGlobalContext, never>> & Partial<Record<keyof _ReduceContext<NoInfer<TContext>>, never>>) | (UseMutationGlobalContext & _ReduceContext<NoInfer<TContext>>)) => unknown;
    /**
     * Runs after the mutation is settled, regardless of the result.
     */
    onSettled?: (
    /**
     * The result of the mutation. `undefined` if the mutation failed.
     */
    data: NoInfer<TData> | undefined, 
    /**
     * The error thrown by the mutation. `undefined` if the mutation was successful.
     */
    error: TError | undefined, 
    /**
     * The variables passed to the mutation.
     */
    vars: NoInfer<TVars>, 
    /**
     * The merged context from `onMutate` and the global context. Properties returned by `onMutate` can be `undefined`
     * if `onMutate` throws.
     */
    context: (Partial<Record<keyof UseMutationGlobalContext, never>> & Partial<Record<keyof _ReduceContext<NoInfer<TContext>>, never>>) | (UseMutationGlobalContext & _ReduceContext<NoInfer<TContext>>)) => unknown;
}
/**
 * Global default options for `useMutations()`.
 * @internal
 */
type UseMutationOptionsGlobalDefaults = UseMutationOptionsGlobal & typeof USE_MUTATION_DEFAULTS;

/**
 * Define a mutation with the given options. Similar to `useMutation(options)` but allows you to reuse the mutation in
 * multiple places.
 *
 * @param options - the options to define the mutation
 * @example
 * ```ts
 * const useCreateTodo = defineMutation({
 *   mutation: (todoText: string) =>
 *     fetch('/api/todos', {
 *       method: 'POST',
 *       body: JSON.stringify({ text: todoText }),
 *     }),
 * })
 * ```
 */
declare function defineMutation<TData, TVars = void, TError = ErrorDefault, TContext extends Record<any, any> = _EmptyObject>(options: UseMutationOptions<TData, TVars, TError, TContext>): () => UseMutationReturn<TData, TVars, TError>;
/**
 * Define a mutation with a function setup. Allows to return arbitrary values from the mutation function, create
 * contextual refs, rename the returned values, etc.
 *
 * @param setup - a function to setup the mutation
 * @example
 * ```ts
 * const useCreateTodo = defineMutation(() => {
 *   const todoText = ref('')
 *   const { data, mutate, ...rest } = useMutation({
 *     mutation: () =>
 *       fetch('/api/todos', {
 *         method: 'POST',
 *         body: JSON.stringify({ text: todoText.value }),
 *       }),
 *   })
 *   // expose the todoText ref and rename other methods for convenience
 *   return { ...rest, createTodo: mutate, todo: data, todoText }
 * })
 * ```
 */
declare function defineMutation<T>(setup: () => T): () => T;

/**
 * Context passed to a Pinia Colada plugin.
 */
interface PiniaColadaPluginContext {
    /**
     * The query cache used by the application.
     */
    queryCache: QueryCache;
    /**
     * The Pinia instance used by the application.
     */
    pinia: Pinia;
    /**
     * An effect scope to collect effects. It should be used if you use any reactivity API like `ref()`, `watch()`, `computed()`, etc.
     * @see {@link https://vuejs.org/api/reactivity-advanced.html#effectscope}
     */
    scope: EffectScope;
}
/**
 * A Pinia Colada plugin.
 */
interface PiniaColadaPlugin {
    (context: PiniaColadaPluginContext): void;
}

/**
 * Options for the Pinia Colada plugin.
 */
interface PiniaColadaOptions {
    /**
     * Pinia instance to use. This is only needed if installing before the Pinia plugin.
     */
    pinia?: Pinia;
    /**
     * Pinia Colada plugins to install.
     */
    plugins?: PiniaColadaPlugin[];
    /**
     * Global options for queries. These will apply to all `useQuery()`, `defineQuery()`, etc.
     */
    queryOptions?: UseQueryOptionsGlobal;
    /**
     * Global options for mutations. These will apply to all `useMutation()`, `defineMutation()`, etc.
     */
    mutationOptions?: UseMutationOptionsGlobal;
}
/**
 * Plugin that installs the Query and Mutation plugins alongside some extra plugins.
 *
 * @see {@link QueryPlugin} to only install the Query plugin.
 *
 * @param app - Vue App
 * @param options - Pinia Colada options
 */
declare const PiniaColada: Plugin<[options?: PiniaColadaOptions]>;

/**
 * Options for {@link PiniaColadaQueryHooksPlugin}.
 */
interface PiniaColadaQueryHooksPluginOptions {
    /**
     * Global handler for when a query is successful.
     *
     * @param data - data returned by the query
     */
    onSuccess?: <TData = unknown>(data: TData, entry: UseQueryEntry<TData, unknown>) => unknown;
    /**
     * Global handler for when a query is settled (either successfully or with an error). Will await for the `onSuccess`
     * or `onError` handlers to resolve if they return a promise.
     *
     * @param data - data returned by the query if any
     * @param error - error thrown if any
     */
    onSettled?: <TData = unknown, TError = unknown>(data: TData | undefined, error: TError | null, entry: UseQueryEntry<TData, TError>) => unknown;
    /**
     * Global error handler for all queries.
     *
     * @param error - error thrown
     */
    onError?: <TError = unknown>(error: TError, entry: UseQueryEntry<unknown, TError>) => unknown;
}
/**
 * Allows to add global hooks to all queries:
 * - `onSuccess`: called when a query is successful
 * - `onError`: called when a query throws an error
 * - `onSettled`: called when a query is settled (either successfully or with an error)
 * @param options - Pinia Colada Query Hooks plugin options
 *
 * @example
 * ```ts
 * import { PiniaColada, PiniaColadaQueryHooksPlugin } from '@pinia/colada'
 *
 * const app = createApp(App)
 * // app setup with other plugins
 * app.use(PiniaColada, {
 *   plugins: [
 *     PiniaColadaQueryHooksPlugin({
 *       onError(error, entry) {
 *         // ...
 *       },
 *     }),
 *   ],
 * })
 * ```
 */
declare function PiniaColadaQueryHooksPlugin(options: PiniaColadaQueryHooksPluginOptions): PiniaColadaPlugin;

export { type AsyncStatus, type DataState, type DataStateStatus, type DataState_Error, type DataState_Pending, type DataState_Success, type DefineQueryOptions, type DefineQueryOptionsTagged, type EntryKey, type EntryKeyTagged, PiniaColada, type PiniaColadaOptions, type PiniaColadaPlugin, type PiniaColadaPluginContext, PiniaColadaQueryHooksPlugin, type PiniaColadaQueryHooksPluginOptions, type QueryCache, type RefetchOnControl, type TypesConfig, type UseInfiniteQueryOptions, type UseInfiniteQueryReturn, type UseMutationOptions, type UseMutationOptionsGlobal, type UseMutationOptionsGlobalDefaults, type UseMutationReturn, type UseQueryEntry, type UseQueryEntryExtensions, type UseQueryEntryFilter, type UseQueryOptions, type UseQueryOptionsGlobal, type UseQueryOptionsWithDefaults, type UseQueryReturn, type UseQueryStateReturn, type _Awaitable, type _DataState_Base, ENTRY_DATA_INITIAL_TAG as _ENTRY_DATA_INITIAL_TAG, ENTRY_DATA_TAG as _ENTRY_DATA_TAG, ENTRY_ERROR_TAG as _ENTRY_ERROR_TAG, type _EmptyObject, type EntryFilter as _EntryFilter, type EntryFilter_Base as _EntryFilter_Base, type EntryFilter_Key as _EntryFilter_Key, type EntryFilter_NoKey as _EntryFilter_NoKey, type IsAny as _IsAny, type IsUnknown as _IsUnknown, type JSONArray as _JSONArray, type JSONObject as _JSONObject, type JSONPrimitive as _JSONPrimitive, type JSONValue as _JSONValue, type _MaybeArray, type _ReduceContext, type _UseQueryEntryNodeValueSerialized, defineMutation, defineQuery, defineQueryOptions, hydrateQueryCache, isQueryCache, serializeQueryCache, toCacheKey, useInfiniteQuery, useMutation, useQuery, useQueryCache, useQueryState };
