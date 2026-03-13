"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
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

type PlannerRequestPayload = {
  location: string;
  date: string;
  timeRange: string;
  budget: number | null;
  preference: string;
  interests: string[];
};

type ItineraryItem = {
  id: string;
  time: string;
  title: string;
  description: string;
  category: string;
  estimatedCost: number | null;
  address?: string;
};

type ItineraryResponse = {
  title: string;
  date: string;
  location: string;
  summary: string;
  preference: string;
  budget: number | null;
  interests: string[];
  items: ItineraryItem[];
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
  const [result, setResult] = useState<ItineraryResponse | null>(null);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function buildPayload(data: PlannerFormData): PlannerRequestPayload {
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

      // TODO: Replace this mock response with real backend response
      const mockResponse: ItineraryResponse = {
        title: `Plan for ${payload.location || "Your Day"}`,
        date: payload.date,
        location: payload.location,
        summary:
          "A personalized itinerary generated from your preferences, budget, and interests.",
        preference: payload.preference,
        budget: payload.budget,
        interests: payload.interests,
        items: [
          {
            id: "1",
            time: "10:00 AM",
            title: "Coffee and breakfast",
            description: "Start your day with a casual breakfast nearby.",
            category: "Food",
            estimatedCost: 15,
            address: "Nearby cafe",
          },
          {
            id: "2",
            time: "12:00 PM",
            title: "Local activity stop",
            description: "Visit a place that matches your selected interests.",
            category: "Activity",
            estimatedCost: 20,
            address: payload.location || "Selected area",
          },
          {
            id: "3",
            time: "3:00 PM",
            title: "Relaxed afternoon activity",
            description: "Enjoy a flexible activity based on your preference.",
            category: payload.preference,
            estimatedCost: payload.budget ? Math.min(payload.budget, 30) : 25,
            address: payload.location || "Selected area",
          },
        ],
      };

      setResult(mockResponse);
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong while generating the itinerary.");
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

      {result && (
        <section className={styles.resultSection}>
          <div className={styles.resultHeader}>
            <p className={styles.formEyebrow}>Generated Itinerary</p>
            <h2 className={styles.resultTitle}>{result.title}</h2>
            <p className={styles.resultSubtitle}>{result.summary}</p>
          </div>

          <div className={styles.resultMeta}>
            <span className={styles.metaPill}>{result.date || "No date"}</span>
            <span className={styles.metaPill}>
              {result.location || "No location"}
            </span>
            <span className={styles.metaPill}>{result.preference}</span>
            <span className={styles.metaPill}>
              Budget: {result.budget === null ? "N/A" : `$${result.budget}`}
            </span>
          </div>

          {result.interests.length > 0 && (
            <div className={styles.interestRow}>
              {result.interests.map((interest) => (
                <span key={interest} className={styles.interestTag}>
                  {interest}
                </span>
              ))}
            </div>
          )}

          <div className={styles.resultList}>
            {result.items.map((item) => (
              <article key={item.id} className={styles.resultCard}>
                <div className={styles.resultTime}>{item.time}</div>

                <div className={styles.resultContent}>
                  <div className={styles.resultTopRow}>
                    <div>
                      <h3>{item.title}</h3>
                      <p className={styles.resultCategory}>{item.category}</p>
                    </div>

                    <span className={styles.resultCost}>
                      {item.estimatedCost === null
                        ? "N/A"
                        : item.estimatedCost === 0
                          ? "Free"
                          : `$${item.estimatedCost}`}
                    </span>
                  </div>

                  <p className={styles.resultDescription}>{item.description}</p>

                  {item.address && (
                    <p className={styles.resultAddress}>
                      <span>Location:</span> {item.address}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
