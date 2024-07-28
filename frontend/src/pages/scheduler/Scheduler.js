import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './scheduler.css';

const Scheduler = () => {
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };
  const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', date: formatDate(new Date()), importance: 'low' });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents(date);
  }, [date]);

  const fetchEvents = async (selectedDate) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/user/events?date=${selectedDate.toISOString().substring(0, 10)}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const result = await response.json();
      setEvents(result);
      console.log('Fetched events:', result); // Debugging log
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleDateChange = (selectedDate) => {
    console.log('Selected Date:', selectedDate); // Debugging log
    const midnight = new Date(selectedDate);
    midnight.setHours(0, 0, 0, 0);
    setDate(midnight);

    const event = events.find(e => new Date(e.date).toDateString() === midnight.toDateString());
    setSelectedEvent(event);

    const updatedFormData = {
      title: event ? event.title : '',
      description: event ? event.description : '',
      date: formatDate(midnight),
      importance: event ? event.importance : 'low'
    };

    setFormData(updatedFormData);
    console.log('Updated Form Data:', updatedFormData); // Debugging log
    setModalOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const method = selectedEvent ? "PUT" : "POST";
    const url = selectedEvent ? `http://localhost:5000/user/events/${selectedEvent.id}` : 'http://localhost:5000/user/events/';
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      await response.json();
      fetchEvents(date);
      setSelectedEvent(null);
      setFormData({ title: '', description: '', date: date.toISOString().substring(0, 10), importance: 'low' });
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!selectedEvent || !selectedEvent._id) {
      console.error("No event selected or invalid event ID");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/user/events/${selectedEvent._id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) {
        console.error(`Failed to delete event with ID ${selectedEvent._id}`);
        console.log('Response status:', response.status);
        return;
      }
      const result = await response.json();
      console.log('Deleted event result:', result); // Debugging log
      fetchEvents(date);
      setSelectedEvent(null);
      setFormData({ title: '', description: '', date: date.toISOString().substring(0, 10), importance: 'low' });
      setModalOpen(false);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };


  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="scheduler-container">
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="calendar-container"
        locale="fr-FR"
        tileContent={({ date, view }) => view === 'month' && (
          <div>
            {events.filter(event => new Date(event.date).toDateString() === date.toDateString()).map((event, index) => (
              <div key={index} className={`event ${event.importance}`}>
                {event.title}
              </div>
            ))}
          </div>
        )}
      />
      {modalOpen && (
        <div className="modal active">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <form onSubmit={handleSubmit}>
              <h2>{selectedEvent ? 'Edit Event' : 'Add Event'}</h2>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Importance</label>
                <select
                  name="importance"
                  value={formData.importance}
                  onChange={handleInputChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <button className="button" type="submit">Save</button>
              {selectedEvent && (
                <button className="button" type="button" onClick={handleDelete}>
                  Delete
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scheduler;