Project: Line 9 Alarm Historian & Monitoring System
1.  Summary 
Business Problem: The "Line 9 Separator" machine currently operates without a supervisory system (SCADA/HMI). Maintenance teams rely on reactive responses, as there is no historical data on alarms or downtime causes. Solution: A custom .NET solution to collect real-time data from the Siemens S7-300 PLC, store alarm history in a SQL Server database, and visualize KPIs via a Web Dashboard. Goal: Reduce Mean Time to Repair (MTTR) and improve visibility of line efficiency.

2. Technical Architecture 
The solution follows a standard 3-Tier Architecture suitable for Industrial IoT (IIoT) applications:

Level 0 (Field): Siemens S7-300 PLC (CP 343-1 Ethernet Module).

Level 1 (Data Collection - Backend): C# Worker Service (Windows Service) using S7.Net library.

Level 2 (Persistence): Microsoft SQL Server.

Level 3 (Presentation): ASP.NET Core Web API + React.js Frontend.

Architecture Diagram (Conceptual)
Snippet de código

[PLC S7-300] <--(TCP/IP iso-on-tcp)--> [C# Service Collector] --(ADO.NET)--> [SQL Server DB]
                                                ^
                                                |
                                          [Web API] <--(JSON)--> [React Dashboard]

3. Functional Requirements 
3.1 Data Acquisition 
The system must establish a TCP/IP connection with the PLC S7-300.

The system must poll a specific Data Block (e.g., DB10) every 500ms.

The system must detect state changes (Rising Edge/Falling Edge) for up to 32 discrete alarm bits.

3.2 Data Storage 
Alarm Start: When a bit goes from 0 to 1, insert a new record with StartTime.

Alarm End: When a bit goes from 1 to 0, update the corresponding record with EndTime and calculate Duration.

Maintain a configuration table mapping PLC Addresses (e.g., DB10.DBX0.1) to Human-Readable Descriptions (e.g., "Motor Overload").

3.3 Visualization 
Live View: Display a list of currently active alarms in real-time.

History View: A table showing past alarms with filters by date.

Dashboard: A Pareto Chart showing the "Top 5 Frequent Alarms" of the day.

4. Technical Scope & Stack 
4.1 Hardware & Network
PLC CPU: Siemens CPU 315-2 PN/DP (or similar S7-300).

Communication Interface: Ethernet (Profinet/Industrial Ethernet).

Protocol: Siemens S7 Protocol (RFC 1006).

4.2 Software Stack (The "Job Requirements" Match)
Language: C# (.NET 6.0 or 8.0).

Library: S7.Net (Open source driver for Siemens PLCs).

Database: SQL Server Express (using raw ADO.NET or Dapper for performance, avoiding heavy Entity Framework overhead for high-frequency logging).

API: ASP.NET Core Web API.

Frontend: React.js (Single Page Application).

5. Data Model Design 
Here is the initial Schema for the SQL Server Database.

Table 1: AlarmConfig (Metadata) | Column | Type | Description | | :--- | :--- | :--- | | AlarmID | INT (PK) | Unique Identifier (1 to 32) | | PLC_Address | VARCHAR(20) | The byte.bit address (e.g., "0.0") | | Description | VARCHAR(100)| "Vacuum Pump Failure" | | IsEnabled | BIT | To ignore unused bits |

Table 2: AlarmEvents (Transactional) | Column | Type | Description | | :--- | :--- | :--- | | EventID | BIGINT (PK) | Auto-increment | | AlarmID | INT (FK) | Reference to AlarmConfig | | StartTime | DATETIME | When the alarm triggered | | EndTime | DATETIME | When the alarm cleared (NULL if active) | | DurationSec| INT | Calculated duration in seconds |
