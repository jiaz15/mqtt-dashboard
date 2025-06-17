### Team Members' Contributions in the Project Execution  

Despite the remote deployment issue of the broker by Member D, the team ensured project progress through collaborative efforts and flexible task adjustments. Here’s a summary of each member’s contributions:  


#### **Member A: Core Connection & Deployment Backup**  
- **Original Tasks**: Developed the MQTT core connection module, implemented dynamic topic subscription and QoS level switching (QoS 0/1/2), and verified protocol correctness via Wireshark packet capture.  
- **Additional Contribution**: When Member D’s remote deployment failed, urgently took over local Mosquitto Broker deployment using Docker, providing the connection address `ws://localhost:8083` in time for Day 2 debugging, ensuring the MQTT data flow remained functional.  


#### **Member B: Data Visualization & Debugging Support**  
- Completed the ECharts framework setup as planned, enabling real-time temperature data updates every second.  
- Integrated with InfluxDB to develop historical data query functions, and implemented联动 (linkage) between time range selectors and real-time charts during cross-module debugging with Member A.  


#### **Member C: Permission System & Tool Development**  
- Designed the login/permission interface, implemented JWT authentication and role switching, and ensured no critical vulnerabilities via OWASP ZAP security testing.  
- Developed a Topic simulator for test data injection and a configuration export function to support system parameter migration.  


#### **Member D: API Provision & Partial Task Delivery**  
- Although remote broker deployment failed, developed the device management API (`/api/devices`) to support backend data interaction for devices.  
- Assisted Member E in performance testing to optimize resource usage under 100-concurrent connections.  


#### **Member E: Testing Framework & Process Assurance**  
- Created basic test cases and configured CI/CD pipelines, ensuring 100% pass rate for automated tests.  
- Led functional and stress testing: covered 90% of core use cases with Cypress, verified message latency <500ms with Locust, and pushed for fixes like the MQTT reconnection strategy.  


#### **Collaboration Highlights**  
Member A’s quick backup in deployment demonstrated technical flexibility. Daily stand-ups enabled seamless progress syncing, ensuring modules like MQTT connection, chart visualization, and permission control were delivered collaboratively. Despite the broker deployment adjustment, the team achieved end-to-end functionality through adaptive teamwork.
