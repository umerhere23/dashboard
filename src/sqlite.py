import sqlite3

# Connect to SQLite database
conn = sqlite3.connect('energy_data.db')
cursor = conn.cursor()

# Create table
cursor.execute('''CREATE TABLE energy_data
                  (id INTEGER PRIMARY KEY,
                   totalPower REAL,
                   kw REAL,
                   kva REAL,
                   powerFactor REAL,
                   frequency REAL)''')

# Insert sample data
cursor.execute('''INSERT INTO energy_data (totalPower, kw, kva, powerFactor, frequency)
                  VALUES (123.4, 56.7, 89.0, 0.95, 50.0)''')

# Save (commit) the changes and close the connection
conn.commit()
conn.close()
