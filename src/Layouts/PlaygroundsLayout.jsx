import { Outlet, Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import playgrounds from '../data/PlaygroundData.js';

// sort the playgrounds alphabetically to show in the sidebar
// playgrounds.sort((a, b) => {
//   if (!a.name || !b.name) {
//     return <h2>Playground doesn't have a name.</h2>
//   }
//   return a.name.localeCompare(b.name);
// }); 
// // console.log(playgrounds);

export default function PlaygroundsLayout() {
  // ---- controls ----
  const [q, setQ] = useState("");
  const [featureFilter, setFeatureFilter] = useState([]); // multi-select
  const [featureMode, setFeatureMode] = useState("any")
  const [sortBy, setSortBy] = useState("name-asc");       // name-asc | name-desc | features-desc | features-asc

  // // build unique feature list once
  // const allFeatures = useMemo(() => {
  //   const s = new Set();
  //   playgrounds.forEach(p => (p.features || []).forEach(f => s.add(f)));
  //   return Array.from(s).sort();
  // }, []);

  // Predicates
  const matchesText = (p) => {
    if (!q) return true;
    const s = q.toLowerCase();
    return (
      p.name?.toLowerCase().includes(s) ||
      p.description?.toLowerCase().includes(s) ||
      p.address?.toLowerCase().includes(s)
    );
  };

  // Feature predicate (Any vs All)
  const matchesFeatures = (p) => {
    if (featureFilter.length === 0) return true;
    const feats = new Set(p.features || []);
    return featureMode === "all"
      ? featureFilter.every((f) => feats.has(f)) // AND
      : featureFilter.some((f) => feats.has(f)); // OR
  };

  // Build feature counts (based on text-matched parks so counts feel relevant)
  const featureCounts = useMemo(() => {
    const counts = new Map();
    playgrounds.forEach((p) => {
      if (!matchesText(p)) return;
      (p.features || []).forEach((f) => {
        counts.set(f, (counts.get(f) || 0) + 1);
      });
    });
    // Sorted list of {feature, count}
    return Array.from(counts.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([feature, count]) => ({ feature, count }));
  }, [q]);

  // const matchesFeatures = (p) => {
  //   if (featureFilter.length === 0) return true;
  //   const feats = new Set(p.features || []);
  //   // OR logic (any selected feature qualifies). For AND use: every()
  //   return featureFilter.every(f => feats.has(f));
  // };

  // Derive filtered + sorted list (don’t mutate the imported array)
  const filtered = useMemo(() => {
    const base = playgrounds.filter(p => matchesText(p) && matchesFeatures(p));
    const copy = base.slice();
    switch (sortBy) {
      case "name-desc":
        copy.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "features-desc":
        copy.sort((a, b) => (b.features?.length || 0) - (a.features?.length || 0));
        break;
      case "features-asc":
        copy.sort((a, b) => (a.features?.length || 0) - (b.features?.length || 0));
        break;
      case "name-asc":
      default:
        copy.sort((a, b) => a.name.localeCompare(b.name));
    }
    return copy;
  }, [q, featureFilter, sortBy]);

  return (
    <>
      {/* Sidebar area */}
      <aside className="sidebar">
        <h3 className="sidebar-heading">Find Playgrounds</h3>
        <div className="sidebar-content" style={{ marginBottom: "1rem" }}>
          {/* Search */}
          <input
            type="search"
            placeholder="Search name, address, or description"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search playgrounds"
            style={{ width: "100%", padding: ".5rem", marginBottom: ".5rem" }}
          />

          {/* Feature mode toggle */}
          <div style={{ display: "flex", gap: ".75rem", margin: ".25rem 0 .5rem" }} role="radiogroup" aria-label="Feature match mode">
            <label>
              <input
                type="radio"
                name="featureMode"
                value="any"
                checked={featureMode === "any"}
                onChange={() => setFeatureMode("any")}
              /> Any
            </label>
            <label>
              <input
                type="radio"
                name="featureMode"
                value="all"
                checked={featureMode === "all"}
                onChange={() => setFeatureMode("all")}
              /> All
            </label>
          </div>

          {/* Feature filter (multi-select) */}
          <label htmlFor="features" style={{ display: "block", marginBottom: ".25rem" }}>
            Filter by feature
          </label>
          <select
            id="features"
            multiple
            value={featureFilter}
            onChange={(e) => setFeatureFilter(Array.from(e.target.selectedOptions, o => o.value))}
            aria-label="Filter by accessibility features"
            style={{ width: "100%", padding: ".5rem", minHeight: "7rem", marginBottom: ".5rem" }}
          >
            {featureCounts.map(({ feature, count }) => (
              <option key={feature} value={feature}>
                {feature} ({count})
              </option>
            ))}
          </select>

          {/* Sort */}
          <label htmlFor="sort" style={{ display: "block", marginBottom: ".25rem" }}>
            Sort
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ width: "100%", padding: ".5rem", marginBottom: ".5rem" }}
          >
            <option value="name-asc">Name (A–Z)</option>
            <option value="name-desc">Name (Z–A)</option>
            <option value="features-desc">Most features</option>
            <option value="features-asc">Fewest features</option>
          </select>

          <button onClick={() => { setQ(""); setFeatureFilter([]); setSortBy("name-asc"); }}>
            Clear filters
          </button>
        </div>

        <h3 className="sidebar-heading">Playgrounds</h3>
        <div className="sidebar-content">
          <ul>
            {filtered.map(p => (
              <li key={p.id}>
                <Link to={`/playgrounds/${p.id}`}>{p.name}</Link>
              </li>
            ))}
            {filtered.length === 0 && <li>No results.</li>}
          </ul>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className='playgrounds-main'>
          <Outlet context={{ filteredPlaygrounds: filtered }}/>
      </div>
    </>
  )
}