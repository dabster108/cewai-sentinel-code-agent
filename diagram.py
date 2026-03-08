import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np

def draw_flowchart():
    fig, ax = plt.subplots(figsize=(10, 12))
    ax.axis('off')
    
    # Define node texts and their Y positions (X is centered at 0.5)
    nodes = [
        {"y": 0.9, "text": "1. Collect Source Files\n(Gather .py files)"},
        {"y": 0.75, "text": "2. Security Agent 🕵️‍♂️\n(analyze_security_task)"},
        {"y": 0.60, "text": "3. Quality Agent 🧹\n(analyze_quality_task)"},
        {"y": 0.45, "text": "4. Report Agent 📝\n(issues/summary_report.md)"},
        {"y": 0.30, "text": "5. Code Fixer Agent 🛠️\n(issues/fixed_files_report.md)"},
        {"y": 0.15, "text": "6. Apply Patches\n(Overwrite .py files)"},
        {"y": 0.0, "text": "7. GitHub Push Tool 🐙\n(Commit and Push)"}
    ]
    
    box_width = 0.5
    box_height = 0.08
    x_center = 0.5
    
    # Draw the main CrewAI container box
    crew_box = patches.FancyBboxPatch(
        (0.2, 0.25), 0.6, 0.58, 
        boxstyle="round,pad=0.05", ec="#2c3e50", fc="#ecf0f1", lw=2, zorder=0
    )
    ax.add_patch(crew_box)
    ax.text(0.5, 0.85, "🤖 CrewAI Sentinel Process", ha='center', va='center', 
            fontsize=12, fontweight='bold', color="#2c3e50")

    # Draw nodes and arrows
    for i, node in enumerate(nodes):
        # Draw Box
        rect = patches.FancyBboxPatch(
            (x_center - box_width/2, node["y"] - box_height/2), 
            box_width, box_height, 
            boxstyle="round,pad=0.03", ec="black", fc="#3498db" if i in [0, 5, 6] else "#ffffff", lw=1.5, zorder=1
        )
        ax.add_patch(rect)
        
        # Add Text
        text_color = "white" if i in [0, 5, 6] else "black"
        ax.text(x_center, node["y"], node["text"], ha='center', va='center', 
                fontsize=10, fontweight='bold', color=text_color)
        
        # Draw Arrow to next node
        if i < len(nodes) - 1:
            next_y = nodes[i+1]["y"] + box_height/2
            current_y = node["y"] - box_height/2
            
            # Adjust arrow for the CrewAI container boundary
            if i == 0:
                current_y = node["y"] - box_height/2
                next_y = 0.75 + box_height/2
            
            ax.annotate('', xy=(x_center, next_y), xytext=(x_center, current_y),
                        arrowprops=dict(arrowstyle='->', lw=2, color='#34495e'))

    plt.title("CrewAI Sentinel Code Agent Architecture", fontsize=16, fontweight='bold', pad=20)
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    draw_flowchart()