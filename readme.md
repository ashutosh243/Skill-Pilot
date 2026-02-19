# AI Skill Learning Path Agent

An AI-powered learning roadmap generator agent built using a graph-based workflow architecture with **LangGraph** and **LangChain**.

The agent uses a multi-step, state-driven pipeline (instead of a single LLM call) to analyze a user’s goal, current skills, and available time, detect skill gaps, and generate a structured day-wise learning plan with human-in-the-loop options to save, regenerate, or discard the result.

## Overview

This project implements an **AI workflow agent** that performs the following steps:

1. Collect user learning data  
2. Discover target skills required for the goal  
3. Detect missing skills  
4. Generate a structured learning roadmap using an LLM  
5. Ask for user confirmation (save / regenerate / discard)

The agent uses:

- Graph-based workflow execution  
- Typed state validation using Zod  
- Thread-based memory using checkpointer  

---
## Agent Workflow

![Overview](./docs/path_workflow.png)

