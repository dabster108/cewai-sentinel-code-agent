from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from typing import List
import os
from dotenv import load_dotenv
from crewai.agents.agent_builder.base_agent import BaseAgent

load_dotenv(override=True)


def current_model() -> str:
    return os.getenv("MODEL", "groq/llama-3.1-8b-instant")



@CrewBase
class SentinelAgent:
    """
    Sentinel Code Security Crew
    Loads agents and tasks from YAML configuration files.
    """ 

    agents_config = "config/agents.yaml"
    tasks_config = "config/tasks.yaml"

    agents: List[BaseAgent]
    tasks: List[Task]

    @agent
    def security_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["security_agent"],
            verbose=True,
            llm=current_model(),
        )

    @agent
    def quality_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["quality_agent"],
            verbose=True,
            TaskEnabled=True,
            llm=current_model(),
        )

    @agent
    def report_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["report_agent"],
            verbose=True,
                TaskEnabled=True,
            llm=current_model(),
        )

    @agent
    def code_fixer(self) -> Agent:
        return Agent(
            config=self.agents_config["code_fixer"],
            verbose=True,
            llm=current_model(),
        )

    @task
    def analyze_security_task(self) -> Task:
        return Task(
            config=self.tasks_config["analyze_security_task"],
            TaskEnabled=True,
        )

    @task
    def analyze_quality_task(self) -> Task:
        return Task(
            config=self.tasks_config["analyze_quality_task"],
            TaskEnabled=True,
        )

    @task
    def generate_report_task(self) -> Task:
        return Task(
            config=self.tasks_config["generate_report_task"],
            output_file="issues/summary_report.md",
        )


    @task
    def fix_vulnerabilities(self) -> Task:
        return Task(
            config=self.tasks_config["fix_vulnerabilities"],
            context=[self.generate_report_task()],  # reads the report output as context
            output_file="issues/fixed_files_report.md",
        )

    @crew
    def crew(self) -> Crew:
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True,
        )