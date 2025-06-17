from graphviz import Digraph

# Initialize workflow graph for MQTT testing
dot = Digraph(comment='MQTT Testing Workflow')
dot.attr(rankdir='TB', size='8,5')

# Define main process nodes
dot.node('S', 'Setup Environment', shape='box')
dot.node('C', 'Connect to Broker', shape='box')
dot.node('Q0', 'Test QoS 0', shape='diamond')
dot.node('Q1', 'Test QoS 1', shape='diamond')
dot.node('Q2', 'Test QoS 2', shape='diamond')
dot.node('R', 'Results Analysis', shape='oval')

# Define process flow with edges
dot.edge('S', 'C', 'Env OK')
dot.edge('C', 'Q0', 'Connection Established')
dot.edge('Q0', 'Q1', 'QoS 0 Passed')
dot.edge('Q1', 'Q2', 'QoS 1 Passed')
dot.edge('Q2', 'R', 'All QoS Tests Complete')

# Failure recovery path
dot.edge('C', 'S', 'Connection Failed', color='red', style='dashed')    
