from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import get_db, engine, Base
from models import QueueEntry
from time import time
from random import randint

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://192.168.1.36:3000",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


### Guest
@app.post("/join_queue")
def post_wait(name: str, people: int, db: Session = Depends(get_db)):
    entry = QueueEntry(
        name=name,
        people=people,
        time=time()
    )

    print("name = {name}, people = {people}")

    db.add(entry)
    db.commit()
    db.refresh(entry)

    return entry

@app.get("/guest")
def read_guest(id: int, db: Session = Depends(get_db)):
    guest = db.query(QueueEntry).filter(
        QueueEntry.id == id
    ).first()

    guest.queue_position = db.query(QueueEntry).filter(
        QueueEntry.time < guest.time,
        QueueEntry.status == "waiting"
    ).count()

    guest.wait_time = 11 + guest.queue_position * 2

    return guest

@app.delete("/leave_queue")
def delete_leave(id: int, db: Session = Depends(get_db)):
    queue_entry = db.query(QueueEntry).filter(QueueEntry.id == id).first()
    if not queue_entry:
        raise HTTPException(
            status_code=404,
            detail="Queue entry not found"
        )

    db.delete(queue_entry)
    db.commit()

    return {"message": "Queue entry deleted"}



### Host

@app.delete("/sit_guest")
def sit_guest(id: int, db: Session = Depends(get_db)):
    queue_entry = db.query(QueueEntry).filter(QueueEntry.id == id).first()
    if not queue_entry:
        raise HTTPException(
            status_code=404,
            detail="Queue entry not found"
        )

    db.delete(queue_entry)
    db.commit()

    return {"message": "Queue entry deleted"}


@app.patch("/call_guest")
def call_guest(id: int, db: Session = Depends(get_db)):
    queue_entry = (
        db.query(QueueEntry)
        .filter(QueueEntry.id == id)
        .first()
    )

    if not queue_entry:
        raise HTTPException(
            status_code=404,
            detail="Queue entry not found"
        )

    queue_entry.status = "called"

    db.commit()
    db.refresh(queue_entry)


@app.get("/queue")
def read_root(db: Session = Depends(get_db)):
    return db.query(QueueEntry).all()
