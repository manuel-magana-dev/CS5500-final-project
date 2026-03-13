"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./page.module.css";

const features = [
  "Smart recommendations",
  "Event discovery",
  "Generated itineraries",
  "Calendar export",
];

type PlannerFormData = {
  location: string;
  date: string;
  timeRange: string;
  budget: string;
  preference: string;
  interests: string;
};

export default function HomePage() {
  const [formData, setFormData] = useState<PlannerFormData>({
    location: "",
    date: "",
    timeRange: "",
    budget: "",
    preference: "Mixed",
    interests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function buildPayload(data: PlannerFormData) {
    return {
      location: data.location.trim(),
      date: data.date,
      timeRange: data.timeRange.trim(),
      budget: data.budget === "" ? null : Number(data.budget),
      preference: data.preference,
      interests: data.interests
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const payload = buildPayload(formData);

    try {
      console.log("Planner payload:", payload);

      // TODO: Replace with actual API call

      alert("Form data collected successfully. Check the browser console.");
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong while preparing the request.");
    } finally {
      setIsSubmitting(false);
    }
  }

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

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fieldGroup}>
              <label htmlFor="location">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Enter city or area"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className={styles.twoColumn}>
              <div className={styles.fieldGroup}>
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="timeRange">Time Range</label>
                <input
                  id="timeRange"
                  name="timeRange"
                  type="text"
                  placeholder="10:00 AM - 8:00 PM"
                  value={formData.timeRange}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.twoColumn}>
              <div className={styles.fieldGroup}>
                <label htmlFor="budget">Budget</label>
                <input
                  id="budget"
                  name="budget"
                  type="number"
                  placeholder="50"
                  min="0"
                  value={formData.budget}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="preference">Preference</label>
                <select
                  id="preference"
                  name="preference"
                  value={formData.preference}
                  onChange={handleChange}
                >
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
                name="interests"
                type="text"
                placeholder="Food, art, music, nature"
                value={formData.interests}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.primaryButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Preparing..." : "Generate Itinerary"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
