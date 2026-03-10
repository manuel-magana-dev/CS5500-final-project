"""Tests for event request and response schemas."""

import pytest
from pydantic import ValidationError

from app.schemas.events import EventRequest, Event


VALID_EVENT_DATA = {
    "name": "Jazz Night at Blue Note",
    "description": "Live jazz performance featuring local artists.",
    "location": "Blue Note, 131 W 3rd St, New York, NY 10012",
    "category": "entertainment",
    "estimated_cost": 25.0,
    "duration_minutes": 120,
    "indoor": True,
    "tags": ["live-music", "jazz", "nightlife"],
    "source": "Eventbrite",
    "event_url": "https://eventbrite.com/e/jazz-night-123",
    "start_time": "2026-04-15T20:00:00",
    "end_time": "2026-04-15T22:00:00",
    "verified": True,
}


class TestEventRequest:
    """Tests for the EventRequest schema."""

    def test_valid_required_fields_only(self):
        req = EventRequest(city="Boston", interests="live music")
        assert req.city == "Boston"
        assert req.interests == "live music"
        assert req.budget is None
        assert req.date_range is None
        assert req.time_window is None

    def test_valid_all_fields(self):
        req = EventRequest(
            city="Boston",
            interests="live music",
            budget=50.0,
            date_range="2026-03-15 to 2026-03-20",
            time_window=180,
        )
        assert req.budget == 50.0
        assert req.date_range == "2026-03-15 to 2026-03-20"
        assert req.time_window == 180

    def test_missing_city_raises(self):
        with pytest.raises(ValidationError) as exc_info:
            EventRequest(interests="food")
        assert "city" in str(exc_info.value)

    def test_missing_interests_raises(self):
        with pytest.raises(ValidationError) as exc_info:
            EventRequest(city="Boston")
        assert "interests" in str(exc_info.value)

    def test_empty_body_raises(self):
        with pytest.raises(ValidationError):
            EventRequest()


class TestEvent:
    """Tests for the Event response schema."""

    def test_valid_event(self):
        event = Event(**VALID_EVENT_DATA)
        assert event.name == "Jazz Night at Blue Note"
        assert event.estimated_cost == 25.0
        assert event.indoor is True
        assert len(event.tags) == 3

    def test_missing_field_raises(self):
        incomplete = {k: v for k, v in VALID_EVENT_DATA.items() if k != "event_url"}
        with pytest.raises(ValidationError) as exc_info:
            Event(**incomplete)
        assert "event_url" in str(exc_info.value)

    def test_wrong_type_raises(self):
        bad_data = {**VALID_EVENT_DATA, "indoor": "not_a_bool_string"}
        with pytest.raises(ValidationError):
            Event(**bad_data)

    def test_tags_must_be_list(self):
        bad_data = {**VALID_EVENT_DATA, "tags": "single-string"}
        with pytest.raises(ValidationError):
            Event(**bad_data)
