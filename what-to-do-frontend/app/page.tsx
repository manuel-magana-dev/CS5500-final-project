import Link from "next/link";
import styles from "./page.module.css";

const features = [
  "Smart recommendations",
  "Event discovery",
  "Generated itineraries",
  "Calendar export",
];

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>AI Activity Planner</div>

          <h1 className={styles.title}>
            Plan your free time with less effort.
          </h1>

          <p className={styles.subtitle}>
            Discover activities and generate a clean itinerary based on your
            preferences.
          </p>

          <div className={styles.featureList}>
            {features.map((feature) => (
              <span key={feature} className={styles.featurePill}>
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <p className={styles.formEyebrow}>Start Planning</p>
            <h2>Create Your Plan</h2>
          </div>

          <form className={styles.form}>
            <div className={styles.fieldGroup}>
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                placeholder="Enter city or area"
              />
            </div>

            <div className={styles.twoColumn}>
              <div className={styles.fieldGroup}>
                <label htmlFor="date">Date</label>
                <input id="date" type="date" />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="timeRange">Time Range</label>
                <input
                  id="timeRange"
                  type="text"
                  placeholder="10:00 AM - 8:00 PM"
                />
              </div>
            </div>

            <div className={styles.twoColumn}>
              <div className={styles.fieldGroup}>
                <label htmlFor="budgetMin">Budget Range</label>
                <div className={styles.rangeRow}>
                  <input
                    id="budgetMin"
                    type="number"
                    placeholder="Min"
                    min="0"
                  />
                  <span className={styles.rangeDivider}>—</span>
                  <input
                    id="budgetMax"
                    type="number"
                    placeholder="Max"
                    min="0"
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="preference">Preference</label>
                <select id="preference" defaultValue="Mixed">
                  <option>Indoor</option>
                  <option>Outdoor</option>
                  <option>Mixed</option>
                </select>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="interests">Interests</label>
              <input
                id="interests"
                type="text"
                placeholder="Food, art, music, nature"
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                rows={4}
                placeholder="Add any preferences or constraints"
              />
            </div>

            <div className={styles.formActions}>
              <Link href="/itinerary" className={styles.primaryButton}>
                Generate Itinerary
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
