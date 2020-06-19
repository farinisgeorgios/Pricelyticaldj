from django.db import models
from django.contrib.postgres.fields import JSONField

class Analysis(models.Model):

    content = models.TextField(blank=True, null=True)
    # blank=True, null=True
    plotdata = JSONField()

