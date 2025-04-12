<template>
  <div class="clock-wrapper">
    <h2>Clock In / Out</h2>
    <div class="clock-in-out-card">
      <p><strong>Status:</strong> {{ clockStatus }}</p>
      <p v-if="clockInTime"><strong>Clocked In:</strong> {{ clockInTime }}</p>
      <p v-if="clockOutTime"><strong>Clocked Out:</strong> {{ clockOutTime }}</p>
      <p v-if="workedHours"><strong>Hours Worked:</strong> {{ workedHours }}</p>

      <div class="buttons">
        <button @click="toggleClock" class="clock-button">
          {{ isClockedIn ? 'Clock Out' : 'Clock In' }}
        </button>
        <button @click="goBack" class="back-button">Back</button>
      </div>
    </div>

    <div class="calendar-view">
      <h3>Your Clock In/Out Calendar</h3>
      <vue-cal style="height: 450px; border-radius: 12px;" :events="calendarEvents" :time="false" default-view="month"
        hide-view-selector locale="en" :first-day-of-week="6" event-color="#4CAF50" event-text-color="#fff"
        :week-start="6" :day-style="dayStyle" @click-event="onEventClick" />
    </div>
  </div>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

export default {
  components: { VueCal },
  data() {
    return {
      isClockedIn: false,
      clockInTime: '',
      clockOutTime: '',
      workedHours: '',
      history: [],
    };
  },
  computed: {
    clockStatus() {
      return this.isClockedIn ? 'Clocked In' : 'Clocked Out';
    },
    calendarEvents() {
      return this.history.map((record) => ({
        title: `Worked: ${record.duration}`,
        start: new Date(record.in),
        end: new Date(record.out),
        content: `From ${record.in} to ${record.out}`,
      }));
    },
  },
  methods: {
    toggleClock() {
      const now = new Date().toLocaleString();
      this.isClockedIn = !this.isClockedIn;

      if (this.isClockedIn) {
        this.clockInTime = now;
        this.clockOutTime = '';
        this.workedHours = '';

        sessionStorage.setItem('clockInTime', now);
        sessionStorage.removeItem('clockOutTime');
        sessionStorage.removeItem('workedHours');
      } else {
        this.clockOutTime = now;
        sessionStorage.setItem('clockOutTime', now);

        const inTime = new Date(this.clockInTime);
        const outTime = new Date(now);
        const diffInMs = outTime - inTime;

        const totalMinutes = Math.floor(diffInMs / (1000 * 60));
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        this.workedHours = `${hours} hour(s) ${minutes} minute(s)`;
        sessionStorage.setItem('workedHours', this.workedHours);

        alert(`You have worked ${this.workedHours}.`);

        const newRecord = {
          in: this.clockInTime,
          out: this.clockOutTime,
          duration: this.workedHours,
        };
        this.history.push(newRecord);
        sessionStorage.setItem('history', JSON.stringify(this.history));
      }

      sessionStorage.setItem('isClockedIn', this.isClockedIn);
    },
    goBack() {
      this.$router.push('/home');
    },
    dayStyle(date) {
      if (date.getDay() === 6 || date.getDay() === 0) {
        return { backgroundColor: '#f1f1f1', color: '#888' };
      }
      return {};
    },
    onEventClick(event) {
      alert(`Details:\n${event.title}\nStart: ${event.start}\nEnd: ${event.end}`);
    }
  },
};
</script>

<style scoped>
.clock-wrapper {
  background: #f4f6f8;
  padding: 3rem;
  border-radius: 12px;
  max-width: 900px;
  margin: 4rem auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.clock-in-out-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.clock-in-out-card p {
  margin: 0.5rem 0;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.clock-button,
.back-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  width: 48%;
  margin: 0.5rem 0;
}

.clock-button:hover {
  background-color: #45a049;
}

.back-button {
  background-color: #eb804b;
}

.back-button:hover {
  background-color: #d77a45;
}

.calendar-view {
  margin-top: 3rem;
  background: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.vuecal__header {
  background-color: #4CAF50;
  color: white;
  font-size: 18px;
  padding: 1rem;
  border-radius: 12px;
}

.vuecal__day {
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

.vuecal__day:hover {
  background-color: #e1f5e1;
  cursor: pointer;
}

.vuecal__event {
  border-radius: 6px;
  font-size: 12px;
  background-color: #4CAF50;
  color: white;
}

.vuecal__event:hover {
  background-color: #388e3c;
}

/* Mobile responsiveness */
@media only screen and (max-width: 768px) {
  .clock-wrapper {
    padding: 1.5rem;
    margin: 2rem auto;
    width: 100%;
  }

  .clock-in-out-card {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .calendar-view {
    margin-top: 2rem;
  }

  .buttons {
    flex-direction: column;
    align-items: center;
  }

  .clock-button,
  .back-button {
    width: 100%;
    margin: 0.5rem 0;
  }

  .vuecal__header {
    font-size: 16px;
    padding: 0.8rem;
  }

  .vuecal__day {
    font-size: 12px;
  }

  .vuecal__event {
    font-size: 10px;
  }
}
</style>
