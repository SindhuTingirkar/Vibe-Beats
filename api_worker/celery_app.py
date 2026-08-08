from celery import Celery

app = Celery(
    "api_worker",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0"
)

# autoload tasks from api_worker.tasks folder
app.autodiscover_tasks(['api_worker.tasks'])
